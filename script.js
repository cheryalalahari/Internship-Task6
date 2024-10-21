// LoginPopUp  Form 

const login_popup = document.querySelector(".login-popup");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const closeBtn = document.querySelector(".icon-close");
const loginBtn = document.querySelector(".login-btn");

registerLink.addEventListener('click', () => {
    login_popup.classList.add("active");
    
});

loginLink.addEventListener('click', () => {
    login_popup.classList.remove("active");
});


window.onload = () => {
    login_popup.classList.add("active-popup");
}

closeBtn.addEventListener('click', () => {
   login_popup.style.display = "none";
})

loginBtn.addEventListener('click', () => {
    login_popup.style.display = "flex";
})

// Login & Registration Form Details Stored in Local Storage 
document
.getElementById("Login")
.addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var login = localStorage.getItem(email);

    if(login){
        var user = JSON.parse(login);
        if(user.password === password){
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "index.html";
        }
        else{
            alert("Wrong Password");
        }
    } else{
        alert("Email does not exist");
    }
    
})
document
.getElementById("Register")
.addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    const user = {
        username: username,
        email: email,
        password: password
    }

    localStorage.setItem(email, JSON.stringify(user));
    alert("Registration Successful! Please Login");
    window.location.href = "index.html";
})

// Fetch Recipe API Key 
const apiKey = "1bfc16aa28d8479c954b2e86497c59b1";

async function searchRecipe(){
    const searchQuery = document.getElementById("query").value;
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`);
        const data = await response.json();
        const recipeList = document.getElementById("results");
        recipeList.innerHTML = "";
        if(data.results.length === 0){
            recipeList.innerHTML = "No recipes found";
        }else{
            data.results.forEach(recipe => {
                const recipeItem = document.createElement("div");
                recipeItem.className = "recipe-item";

                const recipeTitle = document.createElement("h3");
                recipeTitle.textContent = recipe.title;

                const recipeImage = document.createElement("img");
                recipeImage.src = recipe.image;
                recipe.alt = recipe.title;

                const recipeLink = document.createElement("a");
                recipeLink.href = "#";
                recipeLink.textContent = "View Recipe";
                recipeLink.onclick = async () => {
                    await showRecipeDetails(recipe.id);
                };

                recipeItem.appendChild(recipeTitle);
                recipeItem.appendChild(recipeImage);
                recipeItem.appendChild(recipeLink);
                recipeList.appendChild(recipeItem);
            });
        }
    }catch(error){
        console.error("Error:", error);
    }
}

// Recipe Details Display 
async function showRecipeDetails(recipeId){
    const recipeDetailDiv = document.getElementById("recipe-details");
    const recipeContentDiv = document.getElementById("recipe-content");
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        const recipeData = await response.json();

        recipeContentDiv.innerHTML = `
            <h2>${recipeData.title}</h2>
            <img src="${recipeData.image}" alt="${recipeData.title}">
            <p><strong>Ingrediants:</strong>${recipeData.extendedIngredients.map(ingredient => ingredient.original).join(", ")}</p>
            <p><strong>Instructions:</strong>${recipeData.instructions}</p>
            `;

        recipeDetailDiv.style.display = "flex";
    }catch(error){
        console.error("Error:", error);
    }
}

const Displaydetails = document.getElementById("recipe-details");
const closebtn = document.querySelector(".close");
closebtn.onclick = () => {
    Displaydetails.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === Displaydetails) {
        modal.style.display = "none";
    }
};