import './style.css'
import { fetchRecipesWithScrapsv1, fetchRecipesWithScrapsv2, fetchRecipeInstructions, fetchRecipeIngredients, fetchRecipePriceBreakdown, fetchRecipeCard } from './fetch.js';

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

let recipeData = '';


addScrapBtn.addEventListener("click", (event) => {
    const scrap = scrapInput.value.toLowerCase().replace(/[^a-z'\- ]/g, "");
    scrapInput.value = "";
    if (scrap.length > 0){
        const newScrapBullet = document.createElement("li");
        newScrapBullet.setAttribute("class", "scrap");
        newScrapBullet.innerText = scrap;
        scrapList.append(newScrapBullet);
    }
    console.log(scrapList.children.length);
    if (scrapList.children.length > 9){
        scrapInput.disabled = true;
        addScrapBtn.disabled = true;
    }
});

scrapForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const scrapItems = document.querySelectorAll("li.scrap");
    if (scrapItems.length === 0){return;}
    const scraps = [];
    scrapItems.forEach((scrapEl) => {
        scraps.push(scrapEl.innerText);
    })
    console.log(scraps);

    const pantry = [];
    pantryItems.forEach(pantryEl => {
        if (pantryEl.checked){
            pantry.push(pantryEl.value);
        }
    })

    let diet = ''
    for (let i=0; i< dietChoices.length; i++){
        if (dietChoices[i].checked){
            diet = dietChoices[i].value;
        }
    }

    console.log(diet);
    if (pantry.length === 8){
        // console.log(scraps.join());
        recipeData = await fetchRecipesWithScrapsv2(scraps, true, diet);
    }else{
        scraps.push(...pantry);
        // console.log(scraps.join());
        recipeData = await fetchRecipesWithScrapsv2(scraps, false, diet);
    }
    console.log(recipeData);
    const recipes = recipeData.map(recipe => {
        return (`<div class="recipe" id="${recipe.id}">
          <p class="recipe-title">${recipe.title}</p>
          <img src="${recipe.image || "./wolf-zimmerman-cloud-unsplash.jpg"}" alt="${recipe.title}" id="${recipe.id}-img" class="recipe-img"/>
          <p class="recipe-description">${recipe.summary.split(". ")[0]}.</p>
        </div>`);
    });
    recipeContainer.innerHTML = recipes.join("");
    scrapsFormContainer.style.display = "none";
    recipeContainer.style.display = "flex";
    // await fetchRecipesWithScraps(scraps);

});

recipeContainer.addEventListener("click", (event) => {
    if (!event.target.className.includes("recipe")){return;}
    const recipeID = event.target.id;
    const fullRecipe = recipeData.find(recipe => recipe.id === parseInt(recipeID));
    console.log(fullRecipe);

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
    fullRecipeDialog.showModal();

})

closeRecipeModal.addEventListener("click", (event) => {
    console.log(closeRecipeModal);
    fullRecipeDialog.close();
})
// console.log(fetchRecipesWithScrapsv1("apples"));
// console.log(fetchRecipeCard(4632));
// console.log(fetchRecipesWithScrapsv2(["balsamic vinegar"]));

// fullRecipeDialog.showModal();