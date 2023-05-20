const getRecipeById = (recipes, id) => {
  const recipe = recipes.find(recipe => recipe.id === id);
  if(!recipes) { return 'Cannot find recipe'; }
  return recipe;
};

const getRecipeInstructions = (recipe) => {
  return recipe.instructions.reduce((instructions, instruction) => {
    instructions.push(`${instruction.number}. ${instruction.instruction}`);
    return instructions;
  }, []);
};

const filterRecipes = (data, filterTerm) => {
  if(!filterTerm) {
    return 'Sorry, no matching results!'
  }
  const filteredRecipes = data.filter((recipe) => {
     return (recipe.tags.includes(filterTerm.toLowerCase()) || recipe.name.toLowerCase().includes(filterTerm.toLowerCase()))
  })
  if(!filteredRecipes.length) {
    return 'Sorry, no matching results!'
  }
  return filteredRecipes
}

const getRandomItem = (data) => {
  if(!data) {
    return `data not found`;
  }
  const indexPosition = Math.floor(Math.random() * data.length);
  return data[indexPosition];
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

const getAllTags = (recipes) => {
  if(!recipes) return `Error`;
  const availableTags = [];
  const tags = getItems(recipes, 'tags');

  tags.flat().forEach(tag => {
    if(!availableTags.includes(tag)) {
      availableTags.push(tag);
    }
  });
  return availableTags.sort();
};

const alphabetizeData = (data) => {
  data.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
return data
}

export { 
  filterRecipes, 
  getRecipeInstructions, 
  getRecipeById, 
  getRandomItem,
  getIngredients,
  calculateRecipeCost,
  getItems,
  getAllTags,
  alphabetizeData
};
