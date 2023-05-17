//NOTE: Your DOM manipulation will occur in this file
import { sampleRecipeData } from '../src/data/sample-recipes.js';
import { filterRecipes } from '../src/recipes.js';

let searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', () => {
  console.log('clicked')
  searchRecipes()
})
searchInput.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    console.log('enter')
    event.preventDefault();
    searchRecipes(sampleRecipeData);
  }
});

const searchRecipes = (recipes) => {
  const retrieved = retrieveInput()
  return filterRecipes(recipes, retrieved)
}

const retrieveInput = () => {
  searchInput = document.getElementById('search-input');
  return searchInput.value
}



export {
  searchRecipes,
  
}