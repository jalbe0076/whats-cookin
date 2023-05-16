import { getRecipeById } from './recipes'
import './styles.css'
import { sampleRecipeData } from './data/sample-recipes'

// function init() {
// } 

// init()

let currentRecipe = null
console.log(currentRecipe)

const homeBanner = document.querySelector("#home-banner")

homeBanner.addEventListener('click', upatdateCurrentRecipe)

function upatdateCurrentRecipe (e) {
  currentRecipe = getRecipeById(sampleRecipeData, parseInt(e.target.id))
  console.log(sampleRecipeData)
  console.log(e.target.id)
  console.log(currentRecipe)
}

//NOTE: Data model and non-dom manipulating logic will live in this file.

// import apiCalls from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// import ingredientsData from './data/ingredients.js'

//Example of one way to import functions from the domUpdates file. You will delete these examples.
// import {exampleFunction1, exampleFunction2} from './domUpdates.js'

// exampleFunction1('heather')
// exampleFunction2('heather')

// console.log(ingredientsData)