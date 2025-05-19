import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { fetchRecipesWithScrapsv1, fetchRecipeInstructions, fetchRecipeIngredients, fetchRecipePriceBreakdown, fetchRecipeCard } from './fetch.js';

const scrapForm = document.getElementById("scrap-form");
const scrapInput = document.querySelector("#scrap-input");
const scrapList = document.querySelector("#scrap-list");
const pantryItems = document.querySelectorAll('[name= "pantry"');
const addScrapBtn = document.querySelector("#add-scrap-btn");
const recipeContainer = document.querySelector("#recipes-container");
const fullRecipeDialog = document.querySelector("#full-recipe");
const closeRecipeModal = document.querySelector("#close-full-recipe");


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
    // await fetchRecipesWithScraps(scraps);

});

recipeContainer.addEventListener("click", (event) => {
    if (event.target.className.includes("recipe")){
        const recipeID = event.target.id;
        fullRecipeDialog.showModal();
    }
    // fullRecipeDialog.style.display = "block";

})

closeRecipeModal.addEventListener("click", (event) => {
    fullRecipeDialog.close();
})
// console.log(fetchRecipesWithScrapsv1("apples"));
// console.log(fetchRecipeCard(4632));

// fullRecipeDialog.showModal();