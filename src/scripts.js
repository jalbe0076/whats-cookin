// NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css'
import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import ingredientsData from './data/ingredients.js'
import { showSearchResults } from './domUpdates'
import { recipeData } from '../src/data/recipes.js';
import { filterRecipes, getItems } from '../src/recipes.js';

let searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
let searchView = document.querySelector('#search-results-view')
let homeView = document.querySelector('#home-view')

searchBtn.addEventListener('click', () => {
  searchRecipes(recipeData)
})

searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchRecipes(recipeData);
  }
});

const searchRecipes = (recipes) => {
  searchView.classList.remove('hidden')
  homeView.classList.add('hidden')
  const retrieved = retrieveInput()
  const foundRecipes = filterRecipes(recipes, retrieved)
  const recipeNames = getItems(foundRecipes, 'name')
  const recipeImages = getItems(foundRecipes, 'image')
  showSearchResults(retrieved, recipeNames, recipeImages)
}

const retrieveInput = () => {
  searchInput = document.getElementById('search-input');
  return searchInput.value
}


export {
    searchRecipes,
    retrieveInput
  }