import { getRecipeById, getRandomRecipe, filterRecipes, getItems } from './recipes'
import { displayRecipeInfo, displayRecipeOfTheDay, renderResults, hideAllPages, viewSavedRecipes } from './domUpdates'
import './styles.css'
import recipeData from './data/recipes'
import ingredientsData from './data/ingredients'
import { sampleUsersData } from './data/sample-users'
import apiCalls from './apiCalls'

let currentRecipe;
let recipeOfTheDay;
let user = sampleUsersData[1]
let searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchView = document.querySelector('#search-results-view')
const homeBanner = document.querySelector(".home-banner")
const homeView = document.querySelector(".home-view")
const homeIcon = document.querySelector('#home-icon')
const savedView = document.querySelector('#saved-view')
const savedViewBtn = document.querySelector('#view-saved-btn')
let recipeResults = document.querySelectorAll('.recipe-box')

window.addEventListener('load', function() {
  updateRecipeOfTheDay()
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

savedViewBtn.addEventListener('click', () => {
	hideAllPages()
	savedView.classList.remove('hidden')
	viewSavedRecipes(user)
})

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