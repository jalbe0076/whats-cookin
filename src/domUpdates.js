//NOTE: Your DOM manipulation will occur in this file
import { searchRecipes, retrieveInput } from "./scripts";

let searchHeader = document.querySelector('#recipe-results-header')
let recipeBoxes = document.querySelector('#recipe-results')

const showSearchResults = (userValue, names, images) => {
  searchHeader.innerHTML = '';
  recipeBoxes.innerHTML = '';
  searchHeader.innerHTML += `<h1>Showing search results for "${userValue}"...</h1>`
  names.forEach((name, i) => {
    recipeBoxes.innerHTML += `
    <figure class="recipe-box">
      <img src="${images[i]}" alt="image of ${name}">
      <figcaption>${name}</figcaption>
    </figure>
    `
  })
}




export {
  showSearchResults
}