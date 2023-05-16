import { expect } from 'chai';
import { getRecipeInstructions, getRecipeById, filterRecipes, getIngredients, getIngredientNames } from '../src/recipes.js'
import { sampleRecipeData } from '../src/data/sample-recipes.js';
import { sampleIngredientsData } from '../src/data/sample-ingredients.js';

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
    const filteredRecipes = filterRecipes(sampleRecipeData, "Dirty Steve's Original Wing Sauce")
    expect(filteredRecipes).to.be.deep.equal([sampleRecipeData[2]]
    )
  })
  
  it('should let the user know if there were no results found', function() {
    const filteredRecipes = filterRecipes(sampleRecipeData, 'Plastic Garbage')
    expect(filteredRecipes).to.be.equal('Sorry, no matching results!')
  })

})

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
    const ingredientNames = getIngredientNames(ingredients)

    expect(ingredientNames).to.deep.equal(['apple cider', 'apple', 'corn starch'])
  })

  it('should return an error message if no ingredients are found', () => {
    const ingredientNames = getIngredientNames([])

    expect(ingredientNames).to.equal('Sorry, no ingredients given!')
  })
})