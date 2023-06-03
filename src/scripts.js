// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getAllTags, filterRecipes, getRandomItem, getUserRecipes } from './recipes';
import { renderRecipeInfo, renderRecipeOfTheDay, renderRecipes, renderResults, populateTags, renderUser, hideAllPages, displayAllRecipes, viewSavedRecipes } from './domUpdates';
import './styles.css';
import { getAllData, getData, postData, deleteData } from './apiCalls';

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
const savedDropdownCategories = document.querySelector('.saved-dropdown-categories');
let recipeResults = document.querySelectorAll('.recipe-box');
const allRecipesButton = document.querySelector('#all-recipes-btn');
const featured = document.querySelector('.featured')

// =====================================================================
// =========================  EVENT LISTENERS  =========================
// =====================================================================


window.addEventListener('load', function() {
  setData();
  getData('recipes').then(result => {
    const tags = getAllTags(result.recipes);
    populateTags(tags, dropdownCategories);
    updateRecipeOfTheDay();
    updateUser();
    updateFeaturedRecipes();
    selectRecipe()
  });
});

homeIcon.addEventListener('click', () => {
	hideAllPages()
	homeView.classList.remove('hidden')
})

homeView.addEventListener('click', function(e) {
  updateCurrentRecipe(e)
})

homeView.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    updateCurrentRecipe(e)
  }
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
  updateUser()
	hideAllPages()
	savedView.classList.remove('hidden')
	viewSavedRecipes(user, ingredientsData)
  if(user.recipesToCook.length){ populateSavedTags() }
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

savedDropdownCategories.addEventListener('click', (e) => {
  const tag = e.target.classList.value;
  const recipesList = filterRecipes(user.recipesToCook, tag);
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
    recipe.addEventListener('keydown', (e) => {
      if(e.key === "Enter") {
        updateCurrentRecipe(e)      
      }  
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
  if (!user) {
    user = getRandomItem(usersData)
    renderUser(user)
  } else {
    const searchById = user.id;
    user = usersData[searchById - 1];
    user.recipesToCook = getUserRecipes(user, recipeData)
  }
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
    featuredTitle.innerText = `Featured Category: ${capitalTag}`
    renderRecipes(featuredRecipes, featured) 
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

  renderResults(retrieved, foundRecipes, container)
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
  const recipeToCook = { "userID": user.id, "recipeID": currentRecipe.id };
  updateUser();

  if (!user.recipesToCook.some(recipe => recipe.id === currentRecipe.id)) {
    postData(recipeToCook)
    addToSaved.style.color= 'red';
  } else {
    deleteData(recipeToCook)
    addToSaved.style.color= 'grey';
  }
}

const renderHeartColor = () => {
  updateUser();
  return user.recipesToCook.includes(currentRecipe) ? addToSaved.style.color= 'red' : addToSaved.style.color= 'gray'
}

const deletefromSaved = (e) => {
	const selectedRecipeID = parseInt(e.target.id)
  const recipeToDelete = { "userID": user.id, "recipeID": selectedRecipeID };
  deleteData(recipeToDelete);
  addToSaved.style.color= 'grey';
	const updatedSavedRecipes = user.recipesToCook.filter(recipe => recipe.id !== selectedRecipeID)
	user.recipesToCook = updatedSavedRecipes
	viewSavedRecipes(user, ingredientsData)
  if(user.recipesToCook.length){ populateSavedTags() }
}

const setData = () => {
  getAllData().then(data => {
    usersData = data[0].users;
    ingredientsData = data[1].ingredients;
    recipeData = data[2].recipes;
  });
};

const populateSavedTags= () => {
  const savedTags = getAllTags(user.recipesToCook);
  populateTags(savedTags, savedDropdownCategories);   
}

export {
	addDelete,
	retrieveInput,
	saveRecipe,
  selectRecipe,
  setData,
  updateUser
};
