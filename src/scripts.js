// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getAllTags, filterRecipes, getItems, getRandomItem } from './recipes';
import { renderRecipeInfo, renderRecipeOfTheDay, renderResults, populateTags, renderUser, hideAllPages } from './domUpdates';
import './styles.css';
import { getAllData, getData } from './apiCalls';

let currentRecipe;
let recipeOfTheDay;
let user;
let usersData;
let ingredientsData;
let recipeData;

let searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchView = document.querySelector('#search-results-view')
const homeBanner = document.querySelector(".home-banner")
const homeView = document.querySelector(".home-view")
const homeIcon = document.querySelector('#home-icon')
const addToSaved = document.querySelector(".add-to-saved")
const dropdownCategories = document.querySelector('.dropdown-categories');
let recipeResults = document.querySelectorAll('.recipe-box')

// =====================================================================
// =========================  EVENT LISTENERS  =========================
// =====================================================================

window.addEventListener('load', function() {
  setData();
  getData('recipes').then(result => {
    const tags = getAllTags(result.recipes);
    populateTags(tags);
    updateRecipeOfTheDay();
    updateUser();
  });
});

homeIcon.addEventListener('click', () => {
	hideAllPages()
	homeView.classList.remove('hidden')
})

homeBanner.addEventListener('click', function(e) {
  updateCurrentRecipe(e)
})

searchBtn.addEventListener('click', () => {
    searchRecipes(recipeData);
})

searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
      searchRecipes(recipeData)
  }
});

addToSaved.addEventListener('click', function() {
  saveRecipe()
})

dropdownCategories.addEventListener('click', (e) => {
  const tag = e.target.classList.value;
  const recipesList = filterRecipes(recipeData, tag)
  searchRecipes(recipesList, tag);
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
  renderHeartColor()
  renderRecipeInfo(currentRecipe, ingredientsData)
}

const updateUser = () => {
  user = getRandomItem(usersData);
  renderUser(user);
}

const updateRecipeOfTheDay = () => {
  recipeOfTheDay = getRandomItem(recipeData)
  renderRecipeOfTheDay(recipeOfTheDay)
}

const searchRecipes = (recipes, search) => {
  hideAllPages()
  searchView.classList.remove('hidden')
  const retrieved = retrieveInput() || search;
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
  return searchInput.value;
}

const saveRecipe = () => {
  const i = user.recipesToCook.indexOf(currentRecipe);
  !user.recipesToCook.includes(currentRecipe) ? user.recipesToCook.push(currentRecipe) : user.recipesToCook.splice(i, 1);
  renderHeartColor();
}

const renderHeartColor = () => {
  return user.recipesToCook.includes(currentRecipe) ? addToSaved.style.color= 'red' : addToSaved.style.color= 'gray';
}

const setData = () => {
  getAllData().then(data => {
    usersData = data[0].users;
    ingredientsData = data[1].ingredients;
    recipeData = data[2].recipes;
  });
};

export {
	searchRecipes,
	retrieveInput,
	saveRecipe,
  selectRecipe
};
