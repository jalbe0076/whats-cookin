// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getAllTags, filterRecipes, getItems, getRandomItem } from './recipes';
import { renderRecipeInfo, renderRecipeOfTheDay, renderFeaturedRecipes, renderResults, populateTags, renderUser, hideAllPages, displayAllRecipes, viewSavedRecipes } from './domUpdates';
import './styles.css';
import { getAllData, getData } from './apiCalls';

let currentRecipe;
let recipeOfTheDay;
let user;
let featuredRecipes;


let usersData;
let ingredientsData;
let recipeData;


let searchInput = document.querySelector('#search-input');
let searchSaved = document.querySelector('#search-saved');
const currSavedRecipes = document.querySelector('#recipes-to-cook')
const searchBtn = document.querySelector('#search-btn');
const searchView = document.querySelector('#search-results-view')
const homeView = document.querySelector(".home-view")
const homeIcon = document.querySelector('#home-icon')
const savedView = document.querySelector('#saved-view')
const savedViewBtn = document.querySelector('#view-saved-btn')
const addToSaved = document.querySelector(".add-to-saved")
const dropdownCategories = document.querySelector('.dropdown-categories');
let featuredTitle = document.querySelector('.featured-title')
let recipeResults = document.querySelectorAll('.recipe-box')
let deleteBtn = document.querySelectorAll('.delete-btn')
const allRecipesButton = document.querySelector('#all-recipes-btn')

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
  updateFeaturedRecipes();
  });
});

homeIcon.addEventListener('click', () => {
	hideAllPages()
	homeView.classList.remove('hidden')
})

homeView.addEventListener('click', function(e) {
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

allRecipesButton.addEventListener('click', function() {
  displayAllRecipes(recipeData)
});

addToSaved.addEventListener('click', function() {
  saveRecipe()
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
    searchSavedRecipes(user.recipesToCook);
  }
});

const selectRecipe = () => {
  recipeResults = document.querySelectorAll('.recipe-box')
	recipeResults.forEach(recipe => {
    recipe.addEventListener('click', (e) => {
      updateCurrentRecipe(e)        
		})
	})    
}

const addDelete = (deleteBtn) => {
	deleteBtn.forEach(btn => {
		btn.addEventListener('click', (e) => {
			deletefromSaved(e)
		})
	})
}

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================

const updateCurrentRecipe = (e) => {
  currentRecipe = getRecipeById(recipeData, parseInt(e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id))
  renderHeartColor()
  renderRecipeInfo(currentRecipe, ingredientsData)
}

const updateUser = () => {
  user = getRandomItem(usersData)
  !user.recipesToCook ? user.recipesToCook = [] : null
  renderUser(user)
}

const updateRecipeOfTheDay = () => {
  recipeOfTheDay = getRandomItem(recipeData)
  renderRecipeOfTheDay(recipeOfTheDay)
}

const updateFeaturedRecipes = () => {
  featuredRecipes = []
  const tag = getRandomItem(getAllTags(recipeData))
  const taggedRecipes = filterRecipes(recipeData, tag)
  featuredRecipes = taggedRecipes.slice(0,4)
  if(featuredRecipes.length < 4) {
    updateFeaturedRecipes()
  } else {
    const capitalTag = tag.split(' ').map(substring => substring[0].toUpperCase() + substring.slice(1)).join(' ')
    featuredTitle.innerText = `${capitalTag}`
    renderFeaturedRecipes(featuredRecipes) 
  }
}

const searchAllRecipes = (recipes, search) => {
  hideAllPages()
  searchView.classList.remove('hidden')
	const retrieved = retrieveInput() || search;
	searchForRecipes(recipes, retrieved, 'all')
}

const searchForRecipes = (recipes, retrieved, container) => {
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
	searchForRecipes(recipes, retrieved, 'saved')
}

const retrieveInput = () => {
  searchInput = document.getElementById('search-input');
  return searchInput.value;
}

const retrieveSavedInput = () => {
	searchSaved = document.getElementById('search-saved')
	return searchSaved.value
}

const saveRecipe = () => {
  const i = user.recipesToCook.indexOf(currentRecipe)
  !user.recipesToCook.includes(currentRecipe) ? user.recipesToCook.push(currentRecipe) : user.recipesToCook.splice(i, 1)
  renderHeartColor()
}

const renderHeartColor = () => {
  return user.recipesToCook.includes(currentRecipe) ? addToSaved.style.color= 'red' : addToSaved.style.color= 'gray'
}

const deletefromSaved = (e) => {
	const selectedRecipeID = parseInt(e.target.id)
	const updatedSavedRecipes = user.recipesToCook.filter(recipe => recipe.id !== selectedRecipeID)
	user.recipesToCook = updatedSavedRecipes
	viewSavedRecipes(user)
}

const setData = () => {
  getAllData().then(data => {
    usersData = data[0].users;
    ingredientsData = data[1].ingredients;
    recipeData = data[2].recipes;
  });
};

export {
	addDelete,
	retrieveInput,
	saveRecipe,
  selectRecipe
};
