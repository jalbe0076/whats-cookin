import { getIngredients, getRecipeInstructions, calculateRecipeCost } from "./recipes"
import { selectRecipe } from "./scripts"

const recipeName = document.querySelector(".recipe-name")
const recipeIngredientList = document.querySelector(".recipe-ingredients")
const instructions = document.querySelector(".instructions-section") 
const recipeCost = document.querySelector(".recipe-cost")
const recipeView = document.querySelector(".recipe-view")
const homeBanner = document.querySelector(".home-banner")
const recipeImage = document.querySelector(".recipe-image")
const searchHeader = document.querySelector('#recipe-results-header')
const recipeBoxes = document.querySelector('#recipe-results')
const allPages = document.querySelectorAll('.page')
const userInitials = document.querySelector('.initials')
let searchInput = document.querySelector('#search-input');
const dropdownCategories = document.querySelector('.dropdown-categories');

const hideAllPages = () => {
  allPages.forEach(page => page.classList.add('hidden'))
}

const renderUser = (user) => {
  const firstLast = user.name.split(" ")
  const initials = firstLast.reduce((initials, substring) => {
    return initials.concat(substring[0])
  }, '')
  userInitials.innerText = initials
}

const renderResults = (userValue, names, images, ids) => {
  searchHeader.innerHTML = '';
  recipeBoxes.innerHTML = '';
  searchInput.value = '';
  showSearchResults(userValue, names, images, ids)
}

const showSearchResults = (userValue, names, images, ids) => {
  if (!names) {
    searchHeader.innerHTML += `<h1>Sorry, no results for "${userValue}"!</h1>`
  } else {
    searchHeader.innerHTML += `<h1>Showing search results for "${userValue}"...</h1>`
    names.forEach((name, i) => {
      recipeBoxes.innerHTML += `
      <figure id="${ids[i]}" class="recipe-box">
        <img src="${images[i]}" alt="image of ${name}">
        <figcaption>${name}</figcaption>
      </figure>`
    })
    selectRecipe()
  }
}

const renderRecipeInfo = (recipe, data) => {
  recipeName.innerText = recipe.name
  const ingredients = getIngredients(recipe, data)
  const amounts = recipe.ingredients.map(ingredient => {
    return ingredient.quantity.amount
  })
  const units = recipe.ingredients.map(ingredient => {
    return ingredient.quantity.unit
  })
  const ingredientDisplays = ingredients.map((ingredient, i) => {
    return `${amounts[i]} ${units[i]} ${ingredient.name}`
  })
  recipeIngredientList.innerText = `Ingredients: \n ${ingredientDisplays.join('\n')}`
  instructions.innerText = `Instructions: \n ${getRecipeInstructions(recipe).join('\n')}`
  recipeCost.innerText = `Total Cost: $${(calculateRecipeCost(ingredients, recipe) / 100).toFixed(2)}`
  hideAllPages()
  recipeView.classList.remove("hidden")
  recipeImage.src = `${recipe.image}`
  recipeImage.alt = `${recipe.name}`
}

const renderRecipeOfTheDay = (recipe) => {
  homeBanner.innerHTML = 
      `<img class="recipe-of-the-day" alt=${recipe.name} src=${recipe.image}>
      <figcaption>
        <h1>${recipe.name}</h1>
      </figcaption>`
  homeBanner.id = `${recipe.id}`
}

const populateTags = (tags) => {
  dropdownCategories.innerHTML = '';
  tags.forEach(tag => {
    dropdownCategories.innerHTML += `<p class="${tag}">${tag}</p>`;
  });
};

export {
  showSearchResults,
  renderResults,
  renderRecipeInfo,
  renderRecipeOfTheDay,
  renderUser,
  populateTags,
  hideAllPages
}