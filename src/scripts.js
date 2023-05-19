// =====================================================================
// ======================  IMPORTS AND VARIABLES  ======================
// =====================================================================

import { getRecipeById, getAllTags, filterRecipes, getItems, getRandomItem } from './recipes'
import { renderRecipeInfo, renderRecipeOfTheDay, renderResults, populateTags, renderUser, hideAllPages } from './domUpdates'
import './styles.css'
import { getAllData, getData } from './apiCalls'

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
    const tags = getAllTags(result.recipes)
    populateTags(tags);
    updateRecipeOfTheDay();
    updateUser()
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
  console.log(recipeData)
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
      // console.log(result.users)
    user = getRandomItem(usersData);
    // !user.savedRecipes ? user.savedRecipes = [] : null;
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
  return searchInput.value
}

const saveRecipe = () => {
  // let i;
  console.log('saveRecipe', user.recipesToCook)
  // user.recipesToCook.find(reci)
  // const i = user.recipesToCook.indexOf(currentRecipe)
  // let test = user.recipesToCook.find((recipe, index) => recipe.id === currentRecipe.id);
  // console.log('index', i)
  // console.log('included?', test)
  // if(!user.recipesToCook.includes(currentRecipe)) {
  // if(!user.recipesToCook.length) {
  //   user.recipesToCook.push(currentRecipe)
  // }

  //   user.recipesToCook.forEach(recipe => {
  //     console.log(recipe.id === currentRecipe.id)
  //     if(recipe.id === currentRecipe.id) {
  //       console.log('fasdkjfsdalk')
  //     } else {
  //       console.log("Mamma Mia")
  //       user.recipesToCook.push(currentRecipe)
  //     }
  //   })
//   console.log('currentRecipe', currentRecipe)
// console.log('recipe to cook', user.recipesToCook)
  const savedIds = user.recipesToCook.map(recipe => {
    return recipe.id
  });
  if(!savedIds.includes(currentRecipe.id)) {
    user.recipesToCook.push(currentRecipe)
  } else {
    savedIds.find((recipe, i) => {
      if(recipe === currentRecipe.id) {
        user.recipesToCook.splice(i, 1)
      }
    })
  }

    // user.recipesToCook.push(currentRecipe)
    console.log('Recipe', savedIds)
  // }
  // !user.recipesToCook.includes(currentRecipe) ? user.recipesToCook.push(currentRecipe) : user.recipesToCook.splice(i, 1)
  
  renderHeartColor()
}

const renderHeartColor = () => {
  // console.log('user', user)
  const savedIds = user.recipesToCook.map(recipe => {
    return recipe.id
  });
  if(!savedIds.includes(currentRecipe.id)) {
    return addToSaved.style.color= 'gray'
  } else {
    savedIds.find((recipe, i) => {
      if(recipe === currentRecipe.id) {
        return addToSaved.style.color= 'red'
      }
    })
  }
  // return user.recipesToCook.includes(currentRecipe.id) ? addToSaved.style.color= 'red' : addToSaved.style.color= 'gray'
}

const setData = () => {
  getAllData().then(data => {
    usersData = data[0].users;
    ingredientsData = data[1].ingredients;
    recipeData = data[2].recipes;
  })
 }

export {
	searchRecipes,
	retrieveInput,
	saveRecipe,
  selectRecipe
  }
