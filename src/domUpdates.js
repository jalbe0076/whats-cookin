//NOTE: Your DOM manipulation will occur in this file
import { getIngredients, getRecipeInstructions, calculateRecipeCost } from "./recipes"

const recipeName = document.querySelector(".recipe-name")
const recipeIngredientList = document.querySelector(".recipe-ingredients")
const instructions = document.querySelector(".instructions-section") 
const recipeCost = document.querySelector(".recipe-cost")
const recipeView = document.querySelector(".recipe-view")
const homeView = document.querySelector(".home-view")
const homeBanner = document.querySelector(".home-banner")
const recipeImage = document.querySelector(".recipe-image")
const searchHeader = document.querySelector('#recipe-results-header')
const recipeBoxes = document.querySelector('#recipe-results')
let searchInput = document.querySelector('#search-input');

const renderResults = (userValue, names, images) => {
  searchHeader.innerHTML = '';
  recipeBoxes.innerHTML = '';
  searchInput.value = '';
  showSearchResults(userValue, names, images)
}

const showSearchResults = (userValue, names, images) => {
  if (!names) {
    searchHeader.innerHTML += `<h1>Sorry, no results for "${userValue}"!</h1>`
  } else {
    searchHeader.innerHTML += `<h1>Showing search results for "${userValue}"...</h1>`
    names.forEach((name, i) => {
      recipeBoxes.innerHTML += `
      <figure class="recipe-box">
        <img src="${images[i]}" alt="image of ${name}">
        <figcaption>${name}</figcaption>
      </figure>`
    })
  }
}

const displayRecipeInfo = (recipe, data) => {
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
  recipeView.classList.toggle("hidden")
  homeView.classList.toggle("hidden")
  recipeImage.src = `${recipe.image}`
  recipeImage.alt = `${recipe.name}`
}

const displayRecipeOfTheDay = (recipe) => {
  homeBanner.innerHTML = 
      `<img alt=${recipe.name} src=${recipe.image}>
      <figcaption>
        <h1>${recipe.name}</h1>
      </figcaption>`
  homeBanner.id = `${recipe.id}`
}

export {
  showSearchResults,
  renderResults,
  displayRecipeInfo,
  displayRecipeOfTheDay
}