//NOTE: Your DOM manipulation will occur in this file

import { getIngredients, getRecipeInstructions, calculateRecipeCost } from "./recipes"

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
// function exampleFunction1(person) {
//   console.log(`oh hi there ${person}`)
// }

// function exampleFunction2(person) {
//   console.log(`bye now ${person}`)
// }

const recipeName = document.querySelector(".recipe-name")
const recipeIngredientList = document.querySelector(".recipe-ingredients")
const instructions = document.querySelector(".instructions-section") 
const recipeCost = document.querySelector(".recipe-cost")
const recipeView = document.querySelector(".recipe-view")
const homeView = document.querySelector(".home-view")
const homeBanner = document.querySelector(".home-banner")
const recipeImage = document.querySelector(".recipe-image")

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
}

const displayRecipeOfTheDay = (recipe) => {
  homeBanner.innerHTML = 
      `<img id=${recipe.id} alt=${recipe.name} src=${recipe.image}>
      <figcaption id="recipe-today">
        <h1>${recipe.name}</h1>
      </figcaption>`
  console.log('yoooo')
}

export {
  displayRecipeInfo,
  displayRecipeOfTheDay
  // exampleFunction1,
  // exampleFunction2,
}