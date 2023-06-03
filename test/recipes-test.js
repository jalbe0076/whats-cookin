import { expect } from 'chai';
import { getRecipeInstructions, getRecipeById, filterRecipes, getIngredients, getItems, calculateRecipeCost, getRandomItem, getAllTags, getUserRecipes, getGroceryIngredients, calculateGroceryCost } from '../src/recipes.js'
import { sampleRecipeData } from '../src/data/sample-recipes.js';
import { sampleIngredientsData } from '../src/data/sample-ingredients.js';
import { sampleUsersData } from '../src/data/sample-users.js';

describe ('recipe info', () => {
  let findRecipe, findAnotherRecipe;

  beforeEach(() => {
    findRecipe = getRecipeById(sampleRecipeData, 678353);
    findAnotherRecipe = getRecipeById(sampleRecipeData, 595736);
  });

  it('should find a recipe by ID', () => {
    expect(findRecipe.id).to.equal(678353);
  });

  it('should find a different recipe by ID', () => {
    expect(findAnotherRecipe.id).to.equal(595736);
  });

  it('should return the recipe found by ID', () => {
    expect(findRecipe).to.deep.equal(sampleRecipeData[1]);
  });

  it('should return the recipe found by another ID', () => {
    expect(findAnotherRecipe).to.deep.equal(sampleRecipeData[0]);
  });

  it('should return a list of the recipe\'s instruction list', () => {
    const recipe = getRecipeInstructions(findRecipe);
    expect(recipe).to.deep.equal(['1. Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!']);
  });

  it('should return a list of another recipe\'s instructions', () => {
    const recipe = getRecipeInstructions(findAnotherRecipe);
    expect(recipe).to.deep.equal([
      '1. In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
      '2. Add egg and vanilla and mix until combined.',
      '3. Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
      '4. Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.',
      '5. Bake for 9 to 10 minutes, or until you see the edges start to brown.',
      '6. Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.'
    ])
  });

  it('should return an error if it can\'t find recipes', () => {
    const recipeMissingList = getRecipeById(undefined, 678353);
    expect(recipeMissingList).to.equal('Cannot find recipe');
  });

  it('should return an error if the recipe ID does not exist', () => {
    const recipeById = getRecipeById(sampleRecipeData, 6);
    expect(recipeById).to.equal('Cannot find recipe')
  });
});

describe('select a random item', () => {
  let recipe, user;
  
  beforeEach(() => {
    recipe = getRandomItem(sampleRecipeData)
    user = getRandomItem(sampleUsersData)
  })

  it('should be a function', () => {
    expect(getRandomItem).to.be.a('function');
  });

  it('should get a random recipe as an object', () => {
    expect(recipe).to.be.a('object');
  });

  it('should have specific keys if a recipe', () => {
    const recipeKeys = Object.keys(sampleRecipeData[0]);
    expect(recipeKeys).to.deep.equal([ 'id', 'image', 'ingredients', 'instructions', 'name', 'tags' ]);
  });

  it('should return a message if the recipe is not found', () => {
    recipe = getRandomItem()
    expect(recipe).to.equal('data not found');
  });

  it('should get random user as an object', () => {
    expect(user).to.be.a('object');
  });

  it('should have specific keys if a user', () => {
    const userKeys = Object.keys(sampleUsersData[0]);
    expect(userKeys).to.deep.equal([ 'name', 'id', 'pantry', 'recipesToCook' ]);
  });

  it('user should have pantry list', () => {
    expect(user.pantry).to.be.a('array');
  });
  
  it('user should have a recipesToCook list', () => {
    expect(user.recipesToCook).to.be.a('array');
  });
  
  it('user should have a pantry with ingredients', () => {
    expect(user.pantry[0].ingredient).to.exist;
  });
});

describe ('filter', function() {
  
  it('should return an array of filtered recipes by a tag', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, 'starter')
    expect(filteredRecipes).to.be.deep.equal([sampleRecipeData[0]])
  })
  
  it('should be able return an array of filtered recipes by a different tag', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, 'sauce')
    expect(filteredRecipes).to.be.deep.equal([sampleRecipeData[2]])
  })

  it('should be able return an array of filtered recipes by a name', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, "Loaded Chocolate Chip Pudding Cookie Cups");
    expect(filteredRecipes).to.be.deep.equal([sampleRecipeData[0]]);
  });

  it('should be able return an array of filtered recipes by a portion of a word', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, "Cho");
    expect(filteredRecipes).to.be.deep.equal([sampleRecipeData[0], sampleRecipeData[1]]);
  });

  it('should be able return an array of filtered recipes by another name', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, "Dirty Steve's Original Wing Sauce")
    expect(filteredRecipes).to.be.deep.equal([sampleRecipeData[2]])
  })
  
  it('should let the user know if there were no results found', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, 'Plastic Garbage')
    expect(filteredRecipes).to.be.equal('Sorry, no matching results!')
  })
});

describe('ingredients', () => {
  let recipe1, recipe2;

  beforeEach(() => {
    recipe1 = getRecipeById(sampleRecipeData, 595736);
    recipe2 = getRecipeById(sampleRecipeData, 678353);
  });

  it('should find the ingredient information needed for a recipe', () => {
    const ingredients = getIngredients(recipe1, sampleIngredientsData)
    expect(ingredients[1].id).to.equal(18372)
    expect(ingredients[1].name).to.equal('bicarbonate of soda')
    expect(ingredients[1].estimatedCostInCents).to.equal(582)
  })

  it('should return an error message if no ingredients are found', () => {
    const ingredients = getIngredients(recipe2, [])
    expect(ingredients).to.equal('Sorry, no ingredients given!')
  })
  
  it('should determine the names of ingredients needed for a given recipe', () => {
    const ingredients = getIngredients(recipe2, sampleIngredientsData)
    const ingredientNames = getItems(ingredients, 'name')
    expect(ingredientNames).to.deep.equal(['apple cider', 'apple', 'corn starch'])
  })

  it('should return an error message if no ingredients are found', () => {
    const ingredientNames = getItems([])
    expect(ingredientNames).to.equal('Sorry, no list given!')
  })
})

describe('calculate cost of recipe ingredients', () => {
  let recipe, ingredients, recipe2, ingredients2;

  beforeEach(() => {
    recipe = getRecipeById(sampleRecipeData, 595736);
    ingredients = getIngredients(recipe, sampleIngredientsData);
    recipe2 = getRecipeById(sampleRecipeData, 678353);
    ingredients2 = getIngredients(recipe2, sampleIngredientsData);
  });

  it('should calculate the total cost of a given recipe\'s ingredients', () => {
    const costOfCookieCup = calculateRecipeCost(ingredients, recipe)
    expect(costOfCookieCup).to.equal(976)
  });

  it('should calculate the total cost of a different recipe\'s ingredients', () => {
    const costOfPorkChops = calculateRecipeCost(ingredients2, recipe2)
    expect(costOfPorkChops).to.equal(1352)
  });

  it('should show an error if ingredients don\'t exist', () => {
    const badIngredients = calculateRecipeCost([], recipe2);
    expect(badIngredients).to.equal('Error: no ingredients :(');
  });
})

describe('Should get tags from recipes', () => {
  let tagList;

  beforeEach(() => {
    tagList = getAllTags(sampleRecipeData);
  });
  
  it('Should return an array', () => {
    expect(tagList).to.be.a('array');
  });

  it('Should return a list of tag categories', () => {
    expect(tagList).to.deep.equal([
      'antipasti',    'antipasto',
      'appetizer',    'dinner',
      "hor d'oeuvre", 'lunch',
      'main course',  'main dish',
      'sauce',        'snack',
      'starter'
    ]);
  });

  it('Should return a list of tag categories in alphabetical order', () => {
    expect(tagList).to.deep.equal([
      'antipasti',    'antipasto',
      'appetizer',    'dinner',
      "hor d'oeuvre", 'lunch',
      'main course',  'main dish',
      'sauce',        'snack',
      'starter'
    ]);
  });

  it('Should return a list of tag categories in alphabetical order if the recipe list changes', () => {
    const newTagList = getAllTags([sampleRecipeData[0]]);
    expect(newTagList).to.deep.equal([
      'antipasti',
      'antipasto',
      'appetizer',
      "hor d'oeuvre",
      'snack',
      'starter'
    ]);
  });

  it('Should let you know if recipe tags cannot be found', () => {
    const newTagList = getAllTags();
    expect(newTagList).to.equal(`Error`);
  });
});

describe('Get a grocery list', () => {
  let recipesInList;
  
  beforeEach(() => {
    recipesInList = [sampleRecipeData[0], sampleRecipeData[1]]
  });

  it('should return a grocery list object with keys of ingredients and values of amounts, unit, and estiamted cost per unit', () => {
    const grocList = getGroceryIngredients(recipesInList, sampleIngredientsData)
    expect(grocList).to.deep.equal({
      'apple': {amount: 2, unit: '', estimatedCostInCents: 207},
      'apple cider': {amount: 1.5, unit: 'cups', estimatedCostInCents: 468},
      'bicarbonate of soda': {amount: 0.5, unit: 'tsp', estimatedCostInCents: 582},
      'corn starch': {amount: 1, unit: 'tablespoon', estimatedCostInCents: 236},
      'eggs': {amount: 1, unit: 'large', estimatedCostInCents: 472},
      'wheat flour': {amount: 1.5, unit: 'c', estimatedCostInCents: 142}
    })
  });

  it('should return a message if no recipes are saved', () => {
    const grocList = getGroceryIngredients([], sampleIngredientsData)
    expect(grocList).to.equal('Please save some recipes!')
  });
})

describe('calculate cost of grocery list ingredients', () => {
  let recipesInList, recipe;
  
  beforeEach(() => {
    recipesInList = [sampleRecipeData[0], sampleRecipeData[1]]
    recipe = [sampleRecipeData[0]];
  });

  it('should calculate the total cost given one item in a grocery list', () => {
    const grocList = getGroceryIngredients(recipe, sampleIngredientsData)
    const totalCost = calculateGroceryCost(grocList)

    expect(totalCost).to.equal('$9.76')
  })

  it('should calculate the total cost of a given grocery list', () => {
    const grocList = getGroceryIngredients(recipesInList, sampleIngredientsData)
    const totalCost = calculateGroceryCost(grocList)

    expect(totalCost).to.equal('$23.28')
  })

  it('should have an error if no given grocery list is given', () => {
    const totalCost = calculateGroceryCost({})

    expect(totalCost).to.equal('Error: no grocery list :(')
  })
})

describe(`Should return a recipe from an ID`, () => {
  let user;

  beforeEach(() => {
    user = getRandomItem(sampleUsersData);
  });
  
  it('Should grab a recipe object from an ID', () => {
    user.recipesToCook = [ 595736 ];
    const userCookList = getUserRecipes(user, sampleRecipeData)
    expect(userCookList[0]).to.be.an('object');
    expect(userCookList).to.have.lengthOf(1);
  });
  
  it('Each recipe should have an id, picture, ingredients, instructions, a name and tags', () => {
    user.recipesToCook = [ 595736 ];
    const userCookList = getUserRecipes(user, sampleRecipeData)
    expect(userCookList[0]).to.have.keys(['id', 'image', 'ingredients', 'instructions', 'name', 'tags']);
  });

  it('Should grab a list of recipe objects from an ID list', () => {
    user.recipesToCook = [ 595736, 678353 ];
    const userCookList = getUserRecipes(user, sampleRecipeData)
    expect(userCookList[1]).to.be.an('object');
    expect(userCookList).to.have.lengthOf(2);
  });
});