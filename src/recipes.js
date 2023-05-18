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

const getRandomRecipe = (recipeList) => {
  if(!recipeList) {
    return `Recipe not found`;
  }
  const indexPosition = Math.floor(Math.random() * recipeList.length);
  return recipeList[indexPosition];
};

const getIngredients = (currentRecipe, allIngredients) => {
  if(!allIngredients.length){
    return 'Sorry, no ingredients given!'
  }
  return currentRecipe.ingredients.reduce((ingredients, ingredient) => {
    let foundIngredient = allIngredients.find(item => ingredient.id === item.id)
    ingredients.push(foundIngredient)
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

const calculateRecipeCost = (ingredients, recipe) => {
  if(!ingredients.length){
    return 'Error: no ingredients :('
  }
  return ingredients.reduce((totalCost, ingredient) => {
    let ingredientQuantity = recipe.ingredients.find(recipe => recipe.id === ingredient.id) 
    totalCost += (ingredient.estimatedCostInCents * ingredientQuantity.quantity.amount)
    return totalCost
  }, 0);
};

export { 
  filterRecipes, 
  getRecipeInstructions, 
  getRecipeById, 
  getRandomRecipe,
  getIngredients,
  getItems,
  calculateRecipeCost,
};
