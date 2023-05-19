// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getAllTags, filterRecipes, getItems, getRandomItem } from './recipes'
import { renderRecipeInfo, renderRecipeOfTheDay, renderResults, populateTags, renderUser, hideAllPages } from './domUpdates'
import './styles.css'
import recipeData from './data/recipes'
import ingredientsData from './data/ingredients'
import usersData from './data/users'
// import apiCalls from './apiCalls'
import { getData } from './apiCalls'

let currentRecipe;
let recipeOfTheDay;
let user;

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
  getData('recipes').then(result => {
    const tags = getAllTags(result.recipes)
    populateTags(tags);
  });

  updateRecipeOfTheDay();
  updateUser()
});

homeIcon.addEventListener('click', () => {
	hideAllPages()
	homeView.classList.remove('hidden')
})

homeBanner.addEventListener('click', function(e) {
  updateCurrentRecipe(e)
})

searchBtn.addEventListener('click', () => {
  getData('recipes').then(result => {
    searchRecipes(result.recipes)
  });
})

searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getData('recipes').then(result => {
      searchRecipes(result.recipes)
    });
  }
});

addToSaved.addEventListener('click', function() {
  saveRecipe()
})

dropdownCategories.addEventListener('click', (e) => {
  const tag = e.target.classList.value;
  getData('recipes').then(result => {
    const recipesList = filterRecipes(result.recipes, tag)
    searchRecipes(recipesList, tag);
  });
});

// =====================================================================
// ============================  FUNCTIONS  ============================
// =====================================================================
// getData('recipes')
// getData('recipes').then(result => {
//   console.log(result)
//   // console.log(passFunction(result))
//   return result.recipes
// })

const selectRecipe = () => {
  recipeResults = document.querySelectorAll('.recipe-box')
	recipeResults.forEach(recipe => {
    recipe.addEventListener('click', (e) => {
      updateCurrentRecipe(e)        
		})
	})    
}

const updateCurrentRecipe = (e) => {
  getData('recipes').then(recipeResult => {
    getData('ingredients').then(ingredientResult => {
      currentRecipe = getRecipeById(recipeResult.recipes, parseInt(e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id))
      renderHeartColor()
      renderRecipeInfo(currentRecipe, ingredientResult.ingredients)
    });
  });
}

const updateUser = () => {
  getData('users').then(result => {
      // console.log(result.users)
    user = getRandomItem(result.users);
    // !user.savedRecipes ? user.savedRecipes = [] : null;
    renderUser(user);
  });
}
const updateRecipeOfTheDay = () => {
  getData('recipes').then(result => {
    recipeOfTheDay = getRandomItem(result.recipes)
    renderRecipeOfTheDay(recipeOfTheDay)
  });
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
  return searchInput.value
}

const saveRecipe = () => {
  // let i;
  console.log('saveRecipe', user.recipesToCook)
  // user.recipesToCook.find(reci)
  const i = user.recipesToCook.indexOf(currentRecipe)
  // const test = user.recipesToCook.find((recipe, index) recipe.id === currentRecipe.id);
  // console.log('index', i)
  // console.log('included?', test)
  // if(!user.recipesToCook.includes(currentRecipe)) {
    // user.recipesToCook.forEach(recipe => {
    //   if(recipe != currentRecipe) {

    //   }
    // })
    // user.recipesToCook.push(currentRecipe)
    console.log('current Recipe', currentRecipe)
  // }
  !user.recipesToCook.includes(currentRecipe) ? user.recipesToCook.push(currentRecipe) : user.recipesToCook.splice(i, 1)
  
  renderHeartColor()
}

const renderHeartColor = () => {
  // console.log('user', user)
  
  return user.recipesToCook.includes(currentRecipe) ? addToSaved.style.color= 'red' : addToSaved.style.color= 'gray'
}

export {
	searchRecipes,
	retrieveInput,
	saveRecipe,
  selectRecipe
  }
