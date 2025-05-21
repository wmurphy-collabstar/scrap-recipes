# Scrap Recipes
> A web application that uses the [spoonacular food API](https://spoonacular.com/food-api) to find recipes that one can make with _scraps_, or ingredients, one has in their kitchen. The website asks for a list of ingredients, pantry items, and diet and outputs 5 recipes that one can make with those ingredients. I often struggle to think of meals to make with what I have at home, so I was inspired to solve that problem as well as practice using a new API in depth.

<img width="330" alt="Screenshot 2025-05-20 at 9 12 23 PM" src="https://github.com/user-attachments/assets/0788dba0-2852-44b1-8fc9-693a3cf6c659" />
<img width="330" alt="Screenshot 2025-05-20 at 9 19 18 PM" src="https://github.com/user-attachments/assets/12571286-1e74-4123-b820-b7c56d48a561" />
<img width="330" alt="Screenshot 2025-05-20 at 9 23 43 PM" src="https://github.com/user-attachments/assets/494ab08d-78f7-4175-8290-18b940c439b3" />
<img width="500" alt="Screenshot 2025-05-20 at 9 25 30 PM" src="https://github.com/user-attachments/assets/6547c57f-09e9-441b-b949-069fe8679373" />
<img width="500" alt="Screenshot 2025-05-20 at 9 26 40 PM" src="https://github.com/user-attachments/assets/ca31a791-5b86-4741-a810-9677e4049b25" />


Live version:
[Scrap Recipes](#)

## Features
- A form that asks a user for the ingredients in their kitchen, what pantry staples they have, and if they follow a diet
- Recipe cards that show the title, image, and start of summary for the recipe.
- A modal that shows the full recipe when a recipe card is clicked.
- Monochromatic color theme for main page.
- Modular code structure separating tasks into functions that can be reused throughout the `main.js` file.
- Another module called `fetch.js` that provides functions that call different endpoints of the API.
- A Vite file organization isolating HTML, CSS and Javascript concerns, and providing a development server that automatically shows code updates via Hot Module Replacement (HMR).

## About spoonacular API
> A food API that has a vast amount of recipe information, including ingredients, instructions, price breakdown, nutrition information, etc. for many recipes. The recipes are pulled from other sources, but provide way more detail about those recipes, and lots of ways to present that data, including with widgets, images, and more. I chose to use the API to retrieve dinner recipes that includes certain ingredients, diet, and whether the user has normal pantry items or not. I've added the API endpoint I use below and will explain each part of it:
> 
```
https://api.spoonacular.com/recipes/complexSearch?query=dinner&includeIngredients=${scrapsQuery}&instructionsRequired=true&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&ignorePantry=${assumePantry === true ? "false" : "true"}${dietQuery}&sort=max-used-ingredients&sortDirection=asc&number=5
```
- `query` - a natural language search query string, which I use to ask for `dinner` recipes.
- `includeIngredients` - a list of ingredients, where I add the user's list of ingredients with the `scrapsQuery` variable.
- `instructionsRequired` - a boolean for requiring recipes with instructions, which I set to `true`.
- `addRecipeInformation` - a boolean for requiring recipe descriptions, which I set to `true` and use to give a summary of each recipe.
- `addRecipeInstructions` - a boolean for requiring recipe instructions in response, which I set to `true` and provided in the recipe modal.
- `addRecipeNutrition` - a boolean for requiring recipe ingredients and other nutrition information in response, which I set to `true` and provided in the recipe modal.
- `ignorePantry` - a boolean for requiring recipes that either do or don't require regular pantry ingredients like flour and oil, which I set based on whether the user has those pantry ingredients with the `assumePantry` variable.
- `diet` - a string that specifies the kind of diet, which I provide if someone picks `vegetarian`, `vegan`, or `pescatarian`, which I store in the `dietQuery` variable.
- `sort`- a string that describes what to sort by, and in my case, I chose to use `max-used-ingredients`, which means that the API will provide those that use most of the ingredients the user provides.
- `sortDirection` - a string that describes what order to sort the recipes by, either in `asc` or `desc` order. I chose to use `asc` order.
- `number` - a number representing the number of recipes to return back, and I decided to return 5 back each time.

## Getting Started

1. Clone the repo to your local machine.
2. In your file navigator application, navigate to the folder with the git repo inside.
3. Install all the necessary npm dependencies.
4. Run the Vite development environment in your terminal to preview the site.

### Prerequisites

The things you need before installing the software.

* LTS version of Node installed
* A terminal
* A code editor if you plan on inspecting, editing, or contributing to the code.

### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
$ git clone https://github.com/wmurphy-collabstar/scrap-recipes.git
$ cd scrap-recipes
$ npm install
$ npm run dev
$ code .
```
> **Note**: The last command works if you have it configured to open up your editor from the terminal (as you can with Visual Studio Code)

### Branches

* Main: The branch with the latest stable version of the application
