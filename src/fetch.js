/**
 * 
 * @param {string} scraps - list of ingredients in kitchen
 */

const headers = new Headers();
headers.append("x-api-key", import.meta.env.VITE_API_KEY);

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

async function fetchRecipesWithScrapsv2(scraps){
    // GET https://api.spoonacular.com/recipes/complexSearch
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
    fetchRecipesWithScrapsv1,
    fetchRecipesWithScrapsv2,
    fetchRecipeInstructions,
    fetchRecipeIngredients,
    fetchRecipePriceBreakdown,
    fetchRecipeCard
};
