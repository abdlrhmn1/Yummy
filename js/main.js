// loading screen

$(function () {
  $(".spinner").fadeOut(1000, function () {
    $("#loading").slideUp(1000, function () {
      $("body").css("overflow", "auto");
    });
  });
});

function hideSide() {
  let windowScroll = $(".sidebar-inner").innerWidth();
  $("#sidebar").animate({ left: -windowScroll }, 0);
}

let windowScroll = $(".sidebar-inner").innerWidth();
$("#sidebar").css("left", -windowScroll);

{
  $(".toggle-btn").click(function () {
    if ($("#sidebar").css("left") == "0px") {
      $("#sidebar").animate({ left: -windowScroll }, 500);
    } else {
      $("#sidebar").animate({ left: 0 }, 500);
    }
  });
}

function loading() {
  $(function () {
    $(".spinner").fadeOut(1000, function () {
      $("#loading").slideUp(1000, function () {
        $("body").css("overflow", "auto");
      });
    });
  });

  document.querySelector(".loading").innerHTML = `
     <section id="loading">
        <div class="spinner"></div>
    </section>`;
}

// -----------------------------------------
async function getMeals() {
  loading();
  let mealsResponse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  respnseMeals = await mealsResponse.json();
  showMeals();
}

function showMeals() {
  let cartoooona = "";
  for (i = 0; i < 30; i++) {
    cartoooona += `<div class="mealsimg position-relative col-md-3" onclick="showDesc('${respnseMeals.meals[i].idMeal}')"><img src="${respnseMeals.meals[i].strMealThumb}" class="w-100 rounded-3 " alt="">
    <div class="layer position-absolute p-2 rounded-3 overflow-hidden4">
    <br><br><br><br>
    <h3>${respnseMeals.meals[i].strMeal}</h3>
</div>
</div>`;

    document.querySelector(".Data").innerHTML = cartoooona;
  }
}
getMeals();

// ----------------------------------------------------
// search

function search() {
  loading();

  document.querySelector(".search-container").innerHTML = `
    <div class="container p-5">
    <div class="row">
        <div class="col">
            <input type="text" id="searchMeal" class="form-control bg-black text-white"  placeholder=" Search By Name">
        </div>
        <div class="col">
            <input type="text" id="searchFirstLetter" maxlength="1" class="form-control bg-black text-white"  placeholder=" Search By First Letter ">
        </div>
        <div/>
    <div/>
    `;
  searchInput = document.querySelector("#searchMeal");
  searchFirstLetter = document.querySelector("#searchFirstLetter");
  document.querySelector(".Data").innerHTML = "";

  hideSide();

  async function getSearchData() {
    response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    );
    responseSearchApi = await response.json();
    // console.log(responseApi);
  }

  async function searchByLetter() {
    let responseLetterApi = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterValue}`
    );
    resopnseLetter = await responseLetterApi.json();
    // console.log(resopnseLetter);
  }

  function showSearch() {
    let box = "";
    for (i = 0; i < 30; i++) {
      box += `<div class="mealsimg position-relative col-md-3" onclick="showDesc('${responseSearchApi.meals[i].idMeal}')"><img src="${responseSearchApi.meals[i].strMealThumb}" class="w-100 rounded-3 " alt="">
        <div class="layer position-absolute p-2 rounded-3 overflow-hidden4">
        <br><br><br><br>
        <h3>${responseSearchApi.meals[i].strMeal}</h3>
    </div>
    </div>
        `;
      document.querySelector(".Data").innerHTML = box;
    }
  }
  function showSearchLetter() {
    let box = "";
    for (i = 0; i < 30; i++) {
      box += `<div class="mealsimg position-relative col-md-3" onclick="showDesc('${resopnseLetter.meals[i].idMeal}')"><img src="${resopnseLetter.meals[i].strMealThumb}" class="w-100 rounded-3 " alt="">
        <div class="layer position-absolute p-2 rounded-3 overflow-hidden4">
        <br><br><br><br>
        <h3>${resopnseLetter.meals[i].strMeal}</h3>
    </div>
    </div>
        `;
      document.querySelector(".Data").innerHTML = box;
    }
  }
  searchInput.addEventListener("keyup", function () {
    inputValue = searchInput.value;
    getSearchData();
    showSearch();
  });
  searchFirstLetter.addEventListener("keypress", function () {
    letterValue = searchFirstLetter.value;
    searchByLetter();
    showSearchLetter();
  });
}

// $('.searchFirstLetter').$(selector).keypress(function (e) {

// });

// ----------------------------------------------------------------
// Categories

async function getCategory() {
  loading();
  responseData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  categoryResponse = await responseData.json();
  displayCategory();
}

function displayCategory() {
  let boxx = "";

  for (i = 0; i < 30; i++) {
    boxx += ` <div class="mealsimg position-relative col-md-3" onclick="displayCategoryInfo('${
      categoryResponse.categories[i].strCategory
    }')"><img src="${
      categoryResponse.categories[i].strCategoryThumb
    }" class="w-100 rounded-3" alt="">
        <div class="layer position-absolute p-2 rounded-3 overflow-hidden4 text-center">
        <h3>${categoryResponse.categories[i].strCategory}</h3>
        <p class=" text-black">${categoryResponse.categories[
          i
        ].strCategoryDescription
          .split(" ")
          .slice(0, 20)
          .join(" ")}</p>
        </div>
        </div>`;

    document.querySelector(".Data").innerHTML = boxx;
    document.querySelector(".search-container").innerHTML = "";
    hideSide();
  }
}

async function displayCategoryInfo(category) {
  document.querySelector(".Data").innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  categoryInfoResponse = await response.json();
  // console.log(response);

  let box = "";

  for (i = 0; i < 30; i++) {
    box += `
    <div class="mealsimg position-relative col-md-3" onclick="showDesc('${categoryInfoResponse.meals[i].idMeal}')"><img src="${categoryInfoResponse.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <div class="layer position-absolute p-2 rounded-3 overflow-hidden4">
            <br><br><br><br>
            <h3>${categoryInfoResponse.meals[i].strMeal}</h3>
    
            </div>
            </div>`;
    document.querySelector(".Data").innerHTML = box;
  }
}

async function getArea() {
  loading();
  let responseDataa = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  areaResponse = await responseDataa.json();
  displayArea();
}

function displayArea() {
  let cartoona = "";

  for (i = 0; i < 30; i++) {
    cartoona += `
     <div class="text-center cursor-pointer col-md-3" onclick="displayAreaMeals('${areaResponse.meals[i].strArea}')"><i class="fa-solid fa-house-laptop fa-4x"></i>
     <div class=" p-2">
         <h3 class="text-white">${areaResponse.meals[i].strArea}</h3>
         </div>
     </div>
     
`;
    document.querySelector(".Data").innerHTML = cartoona;
    document.querySelector(".search-container").innerHTML = "";

    hideSide();
  }
}

async function displayAreaMeals(area) {
  document.querySelector(".Data").innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  areaInfoResponse = await response.json();
  console.log(areaInfoResponse);

  let box = "";

  for (i = 0; i < 30; i++) {
    box += `
    <div class="mealsimg position-relative col-md-3" onclick="showDesc('${areaInfoResponse.meals[i].idMeal}')"><img src="${areaInfoResponse.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <div class="layer position-absolute p-2 rounded-3 overflow-hidden4">
            <br><br><br><br>
            <h3>${areaInfoResponse.meals[i].strMeal}</h3>
            </div>
            </div>`;
    document.querySelector(".Data").innerHTML = box;
  }
}

// ----------------------------------------------------------------

// Ingredients

async function getIngredients() {
  loading();
  responseDataa = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  ingredientsResponse = await responseDataa.json();
  displayIngredients();
}

function displayIngredients() {
  let cartoona = "";

  for (i = 0; i < 30; i++) {
    cartoona += `
     <div class="mealsimg col-md-3 text-center" onclick="displayIngredientsInfo('${
       ingredientsResponse.meals[i].strIngredient
     }')"><i class="fa-solid fa-drumstick-bite fa-4x"></i>
     <div class=" p-2">
         <h3 class="text-white">${
           ingredientsResponse.meals[i].strIngredient
         }</h3>
         <p>${ingredientsResponse.meals[i].strDescription
           .split(" ")
           .slice(0, 20)
           .join(" ")}</p>
         </div>
     </div>    
`;

    document.querySelector(".Data").innerHTML = cartoona;
    document.querySelector(".search-container").innerHTML = "";
    hideSide();
  }
}

async function displayIngredientsInfo(ingred) {
  document.querySelector(".Data").innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`
  );
  ingredientsInfoResponse = await response.json();
  // console.log(IngredientsInfoResponse);

  let box = "";

  for (i = 0; i < 30; i++) {
    box += `
    <div class="mealsimg position-relative col-md-3" onclick="showDesc('${ingredientsInfoResponse.meals[i].idMeal}')"><img src="${ingredientsInfoResponse.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <div class="layer position-absolute p-2 rounded-3 overflow-hidden4">
            <br><br><br><br>
            <h3>${ingredientsInfoResponse.meals[i].strMeal}</h3>
            </div>
            </div>`;
    document.querySelector(".Data").innerHTML = box;
  }
}

// ----------------------------------------------------------------

// Contacts

function getContacts() {
  loading();
  let cartoona = "";
  for (i = 0; i < 20; i++) {
    cartoona += `
    <div class="contacts min-vh-100 align-items-center justify-content-center d-flex flex-column" id="form">
                <div class="infooooo w-100">
                    <div class="row g-3 m-auto w-75">
                        <div class="col g-3 m-auto text-center">
                            <input type="text" class="form-control user-name my-4" placeholder=" Enter Your Name">
                            <div class="name-alert">

                            </div>

                        </div>
                        <div class="col g-3 m-auto text-center">
                            <input type="email" class="form-control user-email my-4" placeholder="Enter Your Email">
                            <div class="email-alert">

                            </div>
                        </div>
                    </div>
                    <div class="row g-3 m-auto w-75">
                        <div class="col g-3 m-auto text-center">
                            <input type="text" class="form-control user-phone my-4" placeholder=" Enter Your phone">
                            <div class="phone-alert">

                            </div>

                        </div>
                        <div class="col g-3 m-auto text-center">
                            <input type="number" class="form-control user-email my-4" placeholder="Enter Your Age">
                            <div class="age-alert">

                            </div>
                        </div>
                    </div>
                    <div class="row g-3 m-auto w-75">
                        <div class="col g-3 m-auto text-center">
                            <input type="password" class="form-control user-password my-4" placeholder=" Enter Your password">
                            <div class="pass-alert">

                            </div>

                        </div>
                        <div class="col g-3 m-auto text-center">
                            <input type="password" class="form-control user-repassword my-4" placeholder="Enter Your Repassword">
                            <div class="repass-alert">

                            </div>
                        </div>
                    </div>
                </div>
                <div><button class="sub-btn btn btn-outline-danger my-3" disabled>Submit</button></div>
            </div>
`;
  }

  document.querySelector(".Data").innerHTML = cartoona;
  document.querySelector(".search-container").innerHTML = "";
  hideSide();
  validation();
}

// ----------------------------------------------------------------

function validation() {
  let userName = document.querySelector(".user-name");
  let userEmail = document.querySelector(".user-email");
  let userPhone = document.querySelector(".user-phone");
  let userAge = document.querySelector(".user-age");
  let userPass = document.querySelector(".user-password");
  let userRePass = document.querySelector(".user-repassword");
  let subBtn = document.querySelector(".sub-btn");
  // let form=document.getElementById('form')
  let input = document.querySelector("input");

  userName.addEventListener("input", function () {
    if (validName() == true) {
      document.querySelector(".name-alert").remove();
    } else {
      document.querySelector(".name-alert").innerHTML =
        '<p class="alert alert-danger text-center mt-4">Special characters and numbers not allowed</p>';
    }
  });

  userEmail.addEventListener("input", function () {
    if (validEmail() == true) {
      document.querySelector(".email-alert").remove();
    } else {
      document.querySelector(".email-alert").innerHTML =
        '<span class="alert alert-danger text-center mt-4 ">Email not valid *exemple@yyy.zzz</span>';
    }
  });

  userPhone.addEventListener("input", function () {
    if (validPhone() == true) {
      document.querySelector(".phone-alert").remove();
    } else {
      document.querySelector(".phone-alert").innerHTML =
        '<p class="alert alert-danger text-center mt-4">Enter valid Phone Number</p>';
    }
  });

  userPass.addEventListener("input", function () {
    if (validPass() == true) {
      document.querySelector(".pass-alert").remove();
    } else {
      document.querySelector(".pass-alert").innerHTML =
        '<p class="alert alert-danger text-center mt-4">Enter valid password *Minimum 6 characters, at least one letter and one number:*</p>';
    }
  });

  userRePass.addEventListener("input", function () {
    if (validRePass() == true) {
      subBtn.removeAttribute("disabled");
      document.querySelector(".repass-alert").remove();
    } else {
      document.querySelector(".repass-alert").innerHTML =
        '<p class="alert alert-danger text-center mt-4">Enter valid repassword</p>';
    }
  });

  function validName() {
    var regex = /^[a-z]/;
    return regex.test(userName.value);
  }

  function validEmail() {
    var regex = /^[A-Za-z0-9]+@[A-Za-z0-9.]+\.com$/;

    return regex.test(userEmail.value);
  }

  function validPhone() {
    let regex = /^01[0-2]\d{1,8}$/;
    return regex.test(userPhone.value);
  }
  function validPass() {
    let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/;
    return regex.test(userPass.value);
  }

  function validRePass() {
    return userRePass.value == userPass.value;
  }
}

async function showDesc(idMeall) {
  loading();
  document.querySelector(".search-container").innerHTML = "";
  document.querySelector(".Data").innerHTML = "";

  let descResponse = await fetch(
    `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeall}`
  );
  description = await descResponse.json();
  // console.log(description);

  let box = "";
  for (i = 0; i < 30; i++) {
    box += `
        <div class="description d-flex container ">
                <div class="desc-img col-md-4 px-2">
                    <img src="${description.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <h2>${description.meals[i].strMeal}</h2>
                </div>
                <div class="desc-info col-md-8 px-3">
                    <h2>Instructions</h2>
                    <p>${description.meals[i].strInstructions}</p>
                    <h3>Area:${description.meals[i].strArea}</h3>
                    <h3>category:${description.meals[i].strCategory}</h3>
                    <h3>Recipes :</h3>
                    <div class="gredients">
                        <ul class="list-unstyled d-flex flex-wrap">
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure1} ${description.meals[i].strIngredient1}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure2} ${description.meals[i].strIngredient2}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure3} ${description.meals[i].strIngredient3}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure4} ${description.meals[i].strIngredient4}</li>
                            <li class="rounded-3 alert alert-info m-2"> ${description.meals[i].strMeasure5} ${description.meals[i].strIngredient5}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure6} ${description.meals[i].strIngredient6}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure7} ${description.meals[i].strIngredient7}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure8} ${description.meals[i].strIngredient8}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure9} ${description.meals[i].strIngredient9}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure10} ${description.meals[i].strIngredient10}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure11} ${description.meals[i].strIngredient11}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure12} ${description.meals[i].strIngredient12}</li>
                            <li class="rounded-3 alert alert-info m-2">${description.meals[i].strMeasure13} ${description.meals[i].strIngredient13}</li>
                        </ul>
                    </div>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex flex-wrap">
                        <li class="alert alert-danger tag-alert rounded-3 m-2">${description.meals[i].strTags}</li>
                    </ul>
                    <div class="links mb-5">
                        <button class="btn btn-success rounded-3"><a href="${description.meals[i].strSource}" class="text-decoration-none text-white">Source</a></button>
                        <button class="btn btn-danger rounded-3"><a href="${description.meals[i].strYoutube}" class="text-decoration-none text-white">Youtube</a></button>
                    </div>
                </div>
            </div>
        `;
    document.querySelector(".Data").innerHTML = box;
  }
}
