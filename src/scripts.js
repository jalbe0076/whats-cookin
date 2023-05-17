import { getRecipeById, getRandomRecipe, getAllTags } from './recipes'
import { displayRecipeInfo, displayRecipeOfTheDay,populateTags } from './domUpdates'
import './styles.css'
import recipeData from './data/recipes'
import ingredientsData from './data/ingredients'

let currentRecipe = null
let recipeOfTheDay = null

const homeBanner = document.querySelector(".home-banner")

window.addEventListener('load', function() {
  const tags = getAllTags(recipeData)
  console.log(tags)
  updateRecipeOfTheDay();
  populateTags(tags);
})
homeBanner.addEventListener('click', function(e) {
  updateCurrentRecipe(e)
})

const updateCurrentRecipe  = (e) => {
  currentRecipe = getRecipeById(recipeData, parseInt(e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id))
  displayRecipeInfo(currentRecipe, ingredientsData)
}

const updateRecipeOfTheDay = () => {
  recipeOfTheDay = getRandomRecipe(recipeData)
  displayRecipeOfTheDay(recipeOfTheDay)
}




//NOTE: Data model and non-dom manipulating logic will live in this file.

// import apiCalls from './apiCalls'

// NOTE: Data model and non-dom manipulating logic will live in this file.

// import './styles.css'
// import apiCalls from './apiCalls'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// import './images/turing-logo.png'
// import ingredientsData from './data/ingredients.js'
// import {} from './domUpdates.js';

// const dropdownBox = document.querySelector('.category-position');
// const filterCategories = document.querySelector('.dropdown-categories');

// filterCategories.addEventListener('mouseover', )


// Example of one way to import functions from the domUpdates file. You will delete these examples.
// import {exampleFunction1, exampleFunction2} from './domUpdates.js'

// exampleFunction1('heather')
// exampleFunction2('heather')

// console.log(ingredientsData)