//NOTE: Your DOM manipulation will occur in this file

let searchInput = document.querySelector('#search-input');
const searchHeader = document.querySelector('#recipe-results-header')
const recipeBoxes = document.querySelector('#recipe-results')

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


export {
  showSearchResults,
  renderResults
}