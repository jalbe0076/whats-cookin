//NOTE: Your DOM manipulation will occur in this file
import { sampleRecipeData } from '../src/data/sample-recipes.js';
import { filterRecipes, getIngredientNames } from '../src/recipes.js';

let searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
let searchView = document.querySelector('#search-results-view')
let homeView = document.querySelector('#home-view')

searchBtn.addEventListener('click', () => {
  console.log('clicked')
  searchRecipes(sampleRecipeData)
})

searchInput.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    console.log('enter')
    event.preventDefault();
    searchRecipes(sampleRecipeData);
  }
});

const searchRecipes = (recipes) => {
  searchView.classList.remove('hidden')
  homeView.classList.add('hidden')
  const retrieved = retrieveInput()
  const foundRecipes = filterRecipes(recipes, retrieved)
  console.log(foundRecipes)
  // foundRecipes is an array of recipes meeting criteria.
  const recipeNames = getIngredientNames(foundRecipes)
  console.log(recipeNames)
}

const retrieveInput = () => {
  searchInput = document.getElementById('search-input');
  return searchInput.value
}


// load innerHTML for the search results
// searchRecipe returns entire recipe objects
// i want the header's innerText to change to `<h1>Showing search results for "${retrieved}"</h1>`
// the body will show the image of the recipe with the name underneath.
// make a function to display the recipe.name and recipe.image


export {
  searchRecipes,
  
}