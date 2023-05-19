// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getAllTags, filterRecipes, getItems, getRandomItem } from './recipes'
import { renderRecipeInfo, renderRecipeOfTheDay, renderResults, populateTags, renderUser, viewSavedRecipes, hideAllPages } from './domUpdates'
import './styles.css'
import recipeData from './data/recipes'
import ingredientsData from './data/ingredients'
// import usersData from './data/users'
import { sampleUsersData } from './data/sample-users'
import apiCalls from './apiCalls'

let currentRecipe;
let recipeOfTheDay;
let user;

let searchInput = document.querySelector('#search-input');
let searchSaved = document.querySelector('#search-saved');
const currSavedRecipes = document.querySelector('#recipes-to-cook')
const searchBtn = document.querySelector('#search-btn');
const searchView = document.querySelector('#search-results-view')
const homeBanner = document.querySelector(".home-banner")
const homeView = document.querySelector(".home-view")
const homeIcon = document.querySelector('#home-icon')
const savedView = document.querySelector('#saved-view')
const savedViewBtn = document.querySelector('#view-saved-btn')
const dropdownCategories = document.querySelector('.dropdown-categories');
let recipeResults = document.querySelectorAll('.recipe-box')

// =====================================================================
// =========================  EVENT LISTENERS  =========================
// =====================================================================

window.addEventListener('load', function() {
  const tags = getAllTags(recipeData);
  updateRecipeOfTheDay();
  populateTags(tags);
  updateUser()
})

homeIcon.addEventListener('click', () => {
	hideAllPages()
	homeView.classList.remove('hidden')
})

homeBanner.addEventListener('click', function(e) {
  updateCurrentRecipe(e)
})

searchBtn.addEventListener('click', () => {
  searchAllRecipes(recipeData)
})

searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
      searchAllRecipes(recipeData);
  }
});

savedViewBtn.addEventListener('click', () => {
	hideAllPages()
	savedView.classList.remove('hidden')
	viewSavedRecipes(user)
})

dropdownCategories.addEventListener('click', (e) => {
  const tag = e.target.classList.value;
  const recipesList = filterRecipes(recipeData, tag);
  searchAllRecipes(recipesList, tag);
});

searchSaved.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
		currSavedRecipes.classList.add('hidden')
    searchSavedRecipes(user.savedRecipes);
  }
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
  renderRecipeInfo(currentRecipe, ingredientsData)
}

const updateUser = () => {
  user = getRandomItem(sampleUsersData)
  renderUser(user)
}

const updateRecipeOfTheDay = () => {
  recipeOfTheDay = getRandomItem(recipeData)
  renderRecipeOfTheDay(recipeOfTheDay)
}

const searchAllRecipes = (recipes, search) => {
  hideAllPages()
  searchView.classList.remove('hidden')
	const retrieved = retrieveInput() || search;
	searchThisStuff(recipes, retrieved, 'all')
}

const searchThisStuff = (recipes, retrieved, container) => {
  const foundRecipes = filterRecipes(recipes, retrieved)
  if (foundRecipes === 'Sorry, no matching results!'){
    renderResults(retrieved, [], container)
    return
  }
	const formattedRecipes = foundRecipes.map(recipe => {
		return {
			id: recipe.id,
			name: recipe.name,
			image: recipe.image
		}
	})
  renderResults(retrieved, formattedRecipes, container)
}

const searchSavedRecipes = (recipes) => {
	const retrieved = retrieveSavedInput()
	searchThisStuff(recipes, retrieved, 'saved')
}

const retrieveInput = () => {
  searchInput = document.getElementById('search-input');
  return searchInput.value
}

const retrieveSavedInput = () => {
	searchSaved = document.getElementById('search-saved')
	return searchSaved.value
}

export {
	selectRecipe
  }