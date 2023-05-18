// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getRandomRecipe, getAllTags, filterRecipes, getItems } from './recipes'
import { displayRecipeInfo, displayRecipeOfTheDay, populateTags, renderResults, hideAllPages  } from './domUpdates'
import './styles.css'
import recipeData from './data/recipes'
import ingredientsData from './data/ingredients'
import apiCalls from './apiCalls'

let currentRecipe;
let recipeOfTheDay;
let searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchView = document.querySelector('#search-results-view')
const homeBanner = document.querySelector(".home-banner")
const homeView = document.querySelector(".home-view")
const homeIcon = document.querySelector('#home-icon')
const categoryBtn = document.querySelector('#all-categories-btn');
const dropdownCategories = document.querySelector('.dropdown-categories');
let recipeResults = document.querySelectorAll('.recipe-box')

// =====================================================================
// =========================  EVENT LISTENERS  =========================
// =====================================================================

window.addEventListener('load', function() {
  const tags = getAllTags(recipeData);
  updateRecipeOfTheDay();
  populateTags(tags);
})

homeIcon.addEventListener('click', () => {
	hideAllPages()
	homeView.classList.remove('hidden')
})

homeBanner.addEventListener('click', function(e) {
  updateCurrentRecipe(e)
})

searchBtn.addEventListener('click', () => {
  searchRecipes(recipeData)
})

searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
      searchRecipes(recipeData);
  }
});

categoryBtn.addEventListener('mouseover', () => {
  // dropdownCategories.classList.toggle('hidden');
});

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================


const selectRecipe = () => {
	recipeResults = document.querySelectorAll('.recipe-box')
	recipeResults.forEach(recipe => {
		recipe.addEventListener('click', (e) => {
			updateCurrentRecipe(e)        
		})
	})    
}

const updateCurrentRecipe = (e) => {
  currentRecipe = getRecipeById(recipeData, parseInt(e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id))
  displayRecipeInfo(currentRecipe, ingredientsData)
}

const updateRecipeOfTheDay = () => {
  recipeOfTheDay = getRandomRecipe(recipeData)
  displayRecipeOfTheDay(recipeOfTheDay)
}

const searchRecipes = (recipes) => {
  hideAllPages()
  searchView.classList.remove('hidden')
  const retrieved = retrieveInput()
  const foundRecipes = filterRecipes(recipes, retrieved)
  if (foundRecipes === 'Sorry, no matching results!'){
    renderResults(retrieved)
    return
  }
	const recipeIDs = getItems(foundRecipes, 'id')
  const recipeNames = getItems(foundRecipes, 'name')
  const recipeImages = getItems(foundRecipes, 'image')
  renderResults(retrieved, recipeNames, recipeImages, recipeIDs)
}

const retrieveInput = () => {
  searchInput = document.getElementById('search-input');
  return searchInput.value
}

export {
	searchRecipes,
	retrieveInput,
	selectRecipe
  }