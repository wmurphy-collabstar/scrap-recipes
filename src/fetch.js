/**
 * File containing all fetch requests to spoonacular API
 */

// Headers that I use to pass my API key to the API for each GET request
const headers = new Headers();
headers.append("x-api-key", import.meta.env.VITE_API_KEY);


/**
 * Fetches 5 recipes that follow the ingredient, pantry and diet requirements
 * @param {string[]} scraps - list of ingredients user types into form
 * @param {boolean} assumePantry - indicates whether user has pantry items or not
 * @param {*} diet - kind of diet user follows (vegetarian, vegan, pescatarian or other)
 * @returns Object containing necessary information for displaying all the recipes
 */
async function fetchRecipesWithScrapsEnhanced(scraps, assumePantry, diet){
    // GET https://api.spoonacular.com/recipes/complexSearch
    try{
        const scrapsQuery = scraps.join();
        const dietQuery = diet === "other" ? "": "&diet="+diet;
        // console.log(dietQuery);
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=dinner&includeIngredients=${scrapsQuery}&instructionsRequired=true&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&ignorePantry=${assumePantry === true ? "false" : "true"}${dietQuery}&sort=max-used-ingredients&sortDirection=asc&number=5`;
        // console.log(url);
        const response = await fetch(url, {headers: headers});
        const data = await response.json();
        // console.log("fetchRecipesWithScrapsv2 data");
        if (data.status){
            throw new Error(`${data.code}: ${data.message}`);
        }else {
            // console.log(data);
            return data.results.map(recipe => {
                return {
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image,
                    credits: recipe.creditsText,
                    license: recipe.license,
                    summary: recipe.summary,
                    ingredients: recipe.nutrition.ingredients.map(ingredient => {
                        return {
                            name: ingredient.name,
                            amount: ingredient.amount,
                            unit: ingredient.unit
                        }
                    }),
                    instructions: recipe.analyzedInstructions[0].steps.map(step => step.step),
                    readyInMinutes: recipe.readyInMinutes,
                    servings: recipe.servings,
                    link: recipe.spoonacularSourceUrl
                }
            });
        }
    }catch(error){
        console.error(error);
    }

}

/** Functions that I can use for expanding this project */

async function fetchRecipesWithScrapsv1(scraps){
    // GET https://api.spoonacular.com/recipes/findByIngredients
    try{
        const scrapsQuery = scraps.join(",+")
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${scrapsQuery}&number=5&ranking=2`, {headers: headers});
        const data = await response.json();
        console.log("fetchRecipesWithScraps data");
        if (data.status){
            throw new Error(`${data.code}: ${data.message}`);
        }else {
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }

}

async function fetchRecipeIngredients(recipeID){
    // GET  https://api.spoonacular.com/recipes/{id}/ingredientWidget.json
    try{
        const response = await fetch(` https://api.spoonacular.com/recipes/${recipeID}/ingredientWidget.json`, {headers: headers});
        const data = await response.json();
        console.log("fetchRecipeIngredients data");
        if (data.status){
            throw new Error(`${data.code}: ${data.message}`);
        }else {
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }

}

async function fetchRecipeInstructions(recipeID){
    // GET https://api.spoonacular.com/recipes/{id}/analyzedInstructions
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions`, {headers: headers});
        const data = await response.json();
        console.log("fetchRecipeInstructions data");
        if (data.status){
            throw new Error(`${data.code}: ${data.message}`);
        }else {
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }
}

async function fetchRecipePriceBreakdown(recipeID){
    // GET https://api.spoonacular.com/recipes/{id}/priceBreakdownWidget
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/priceBreakdownWidget`, {headers: headers});
        const data = await response.json();
        console.log("fetchRecipePriceBreakdown data");
        if (data.status){
            throw new Error(`${data.code}: ${data.message}`);
        }else {
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }
}

async function fetchRecipeCard(recipeID){
    // GET https://api.spoonacular.com/recipes/{id}/card
    try{
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/card`, {headers: headers});
        const data = await response.json();
        console.log("fetchRecipeCard data");
        // console.log(data);
        if (!data.url){
            throw new Error(`${data.code}: ${data.message}`);
        }else {
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }
}

export {
    fetchRecipesWithScrapsEnhanced
};
