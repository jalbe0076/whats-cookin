//NOTE: Your DOM manipulation will occur in this file

import { getIngredients, getIngredientNames } from "./recipes"

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
// function exampleFunction1(person) {
//   console.log(`oh hi there ${person}`)
// }

// function exampleFunction2(person) {
//   console.log(`bye now ${person}`)
// }

const recipeName = document.querySelector(".recipe-name")
const recipeIngredientList = document.querySelector(".recipe-ingredients")
// const instructions = 
 
const displayRecipeInfo = (recipe, data) => {
  recipeName.innerText = recipe.name
  console.log(recipe)
  const ingredients = getIngredients(recipe, data)
  const ingredientNames = getIngredientNames(ingredients)
  const stringList = ingredientNames.join('\n')
  // recipeIngredientList = document.querySelector(".recipe-ingredients")
  console.log(stringList)
  recipeIngredientList.innerText = stringList
}

export {
  displayRecipeInfo
  // exampleFunction1,
  // exampleFunction2,
}