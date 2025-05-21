import './style.css'
import { fetchRecipesWithScrapsEnhanced } from './fetch.js';

// HTML elements I need to dynaimcally add content to or interact with
const scrapsFormContainer = document.querySelector("#scraps-form-container");
const scrapForm = document.getElementById("scrap-form");
const scrapInput = document.querySelector("#scrap-input");
const scrapList = document.querySelector("#scrap-list");
const pantryItems = document.querySelectorAll('[name= "pantry"');
const addScrapBtn = document.querySelector("#add-scrap-btn");
const dietChoices = document.querySelectorAll("input[type=radio]");
const recipeContainer = document.querySelector("#recipes-container");
const fullRecipeDialog = document.querySelector("#full-recipe");
const closeRecipeModal = document.querySelector("#close-full-recipe");

// Object containing all document elements inside the recipe dialog element
const dialogElements = {
    title: document.getElementById("full-recipe-title"),
    summary: document.getElementById("full-recipe-summary"),
    link: document.getElementById("full-recipe-link"),
    image: document.getElementById("full-recipe-img"),
    time: document.getElementById("full-recipe-time"),
    servings: document.getElementById("full-recipe-servings"),
    ingredients: document.getElementById("full-recipe-ingredients"),
    instructions: document.getElementById("full-recipe-instructions")
};

// Global variable containing all recipe data from API call
let recipeData = '';

// Function that takes input and santizes/adds input to ingredient list. If 10 ingredients are added, stops user from adding more.
function addScraps(){
    const scrap = scrapInput.value.toLowerCase().replace(/[^a-z'\- ]/g, "");
    scrapInput.value = "";
    if (scrap.length > 0){
        const newScrapBullet = document.createElement("li");
        newScrapBullet.setAttribute("class", "scrap");
        newScrapBullet.innerText = scrap;
        scrapList.append(newScrapBullet);
    }
    // console.log(scrapList.children.length);
    if (scrapList.children.length > 9){
        scrapInput.disabled = true;
        addScrapBtn.disabled = true;
    }
}

// Runs the addScraps function every time addScrapBtn is clicked
addScrapBtn.addEventListener("click", addScraps);

// Function that retrieves all scraps inputted by user
function getListOfScraps(){
    const scrapItems = document.querySelectorAll("li.scrap");
    if (scrapItems.length === 0){return;}
    const scraps = [];
    scrapItems.forEach((scrapEl) => {
        scraps.push(scrapEl.innerText);
    })
    return scraps;
}

// Function that retrieves which pantry items were selected by user
function getPantryItemsPicked(){
    const pantry = [];
    pantryItems.forEach(pantryEl => {
        if (pantryEl.checked){
            pantry.push(pantryEl.value);
        }
    })
    return pantry;
}

// Function that retrieves user's choice of a diet
function getDiet(){
    let diet = '';
    for (let i=0; i< dietChoices.length; i++){
        if (dietChoices[i].checked){
            diet = dietChoices[i].value;
        }
    }
    return diet;
}


/**
 * Changes call to recipe API depending on whether the user has common pantry items or not
 * @param {string[]} scraps - list of ingredients user added
 * @param {boolean} pantry - whether the user has standard pantry items or not
 * @param {string} diet - kind of diet user might have (only options are vegetarian, vegan, pescatarian and other)
 * @returns recipeData, an object containing all data necessary to display recipe cards and full recipe
 */
async function callAPI(scraps, pantry, diet){
    if (pantry.length === 8){
        recipeData = await fetchRecipesWithScrapsEnhanced(scraps, true, diet);
    }else{
        scraps.push(...pantry);
        recipeData = await fetchRecipesWithScrapsEnhanced(scraps, false, diet);
    }
    return recipeData;
}

// Renders the HTML for the recipe cards using the fetched recipe data
function renderRecipeCards(){
    const recipes = recipeData.map(recipe => {
        return (`<div class="recipe" id="${recipe.id}">
        <p class="recipe-title">${recipe.title}</p>
        <img src="${recipe.image}" alt="${recipe.title}" id="${recipe.id}-img" class="recipe-img"/>
        <p class="recipe-description">${recipe.summary.split(". ")[0]}.</p>
        </div>`);
    });
    recipeContainer.innerHTML = recipes.join("");
}

// Renders the error if the API call fails or no recipes were returned back
function renderError(){
    recipeContainer.innerHTML = `<strong>I couldn't retrieve the recipes you were looking for. You can reload the page and try again, or try another day. If you try again, making sure you spell the ingredients correctly when adding them. I'm going to catch some sleep, so good night!</strong>`;
}

scrapForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const scraps = getListOfScraps();
    // console.log(scraps);

    const pantry = getPantryItemsPicked();

    const diet = getDiet();
    // console.log(diet);

    try {
        recipeData = await callAPI(scraps, pantry, diet);
        // console.log(recipeData);
        if (recipeData.length === 0){
            throw new Error("No recipes returned");
        }
        renderRecipeCards();
    }catch(err){
        renderError();
    }finally{
        scrapsFormContainer.style.display = "none";
        recipeContainer.style.display = "flex";
    }
    // await fetchRecipesWithScraps(scraps);

});

/**
 * Function that populates dialog modal with current recipe data
 * @param {Object} fullRecipe - object containing all necessary recipe information
 */
function populateRecipeModal(fullRecipe){
    dialogElements.title.innerText = fullRecipe.title;
    dialogElements.link.href = fullRecipe.link;
    dialogElements.image.src = fullRecipe.image;
    dialogElements.summary.innerHTML = fullRecipe.summary;
    dialogElements.time.innerText = `Total Time in Minutes: ${fullRecipe.readyInMinutes}`;
    dialogElements.servings.innerText = `Servings: ${fullRecipe.servings}`;
    dialogElements.ingredients.innerHTML = fullRecipe.ingredients.map(ingredient => {
            return (`<li>${ingredient.amount} ${ingredient.unit ? ingredient.unit+" ": ""} ${ingredient.name}</li>`);
         }).join("");
    dialogElements.instructions.innerHTML = fullRecipe.instructions.map(instruction => {
            return `<li>${instruction}</li>`;
        }).join("");
}

// Gets recipe id and information for clicked recipe card and opens modal for that recipe
recipeContainer.addEventListener("click", (event) => {
    if (!event.target.className === "recipe"){return;}
    const recipeID = event.target.id;
    const fullRecipe = recipeData.find(recipe => recipe.id === parseInt(recipeID));
    // console.log(fullRecipe);
    if (fullRecipe === undefined) {return;}
    populateRecipeModal(fullRecipe);
    fullRecipeDialog.showModal();

})

// Function that closes the dialog modal when closeRecipeModal button is clicked
closeRecipeModal.addEventListener("click", (event) => {
    fullRecipeDialog.close();
})