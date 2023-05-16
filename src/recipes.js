const homeBanner = document.querySelector("#home-banner")

homeBanner.addEventListener('click', upatdateCurrentRecipe)

const getRecipeById = (recipes, id) => {
  const recipe = recipes.find(recipe => recipe.id === id);
  return recipe;
};

const getRecipeInstructions = (recipe) => {
  return recipe.instructions.reduce((instructions, instruction) => {
    instructions.push(`${instruction.number}. ${instruction.instruction}`);
    return instructions;
  }, []);
};

const filterRecipes = (data, filterTerm) => {
  const filteredRecipes = data.filter((recipe) => {
     return recipe.tags.includes(filterTerm) || recipe.name === filterTerm
  })
  if(filteredRecipes.length === 0) {
    return 'Sorry, no matching results!'
  }
  return filteredRecipes
}

currentRecipe = null

// const upatdateCurrentRecipe = () => {
//   currentRecipe = 
// } 

export {
  filterRecipes,
  getRecipeInstructions, 
  getRecipeById
}
