
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
     return (recipe.tags.includes(filterTerm.toLowerCase()) || recipe.name.toLowerCase().includes(filterTerm.toLowerCase()))
  })
  if(filteredRecipes.length === 0) {
    return 'Sorry, no matching results!'
  }
  return filteredRecipes
}

const getIngredients = (currentRecipe, allIngredients) => {
  if(!allIngredients.length){
    return 'Sorry, no ingredients given!'
  }
  return currentRecipe.ingredients.reduce((ingredients, ingredient) => {
    let foundIngredients = allIngredients.find(item => ingredient.id === item.id)
    ingredients.push(foundIngredients)
    return ingredients;
  },[]);
};

const getItems = (list, key) => {
  if(!list.length){
    return 'Sorry, no list given!'
  }
  let allValues = [];
  list.forEach(item => allValues.push(item[key]))
  return allValues;
}

export { 
  filterRecipes, 
  getRecipeInstructions, 
  getRecipeById,
  getIngredients,
  getItems 
};

