const { addNewRecipe, getAllRecipes, getOneRecipe } = require('../../models/recipes/recipes.model');

async function httpAddNewRecipe(req, res) {
  const recipe = { author: req.user.userId, ...req.body }

  if(!recipe.ingredients || !recipe.steps || !recipe.title) {
    return res.status(400).json({
      error: 'Missing required recipe property',
    })
  }

  //should we also validate that, for example, empty ingredients is invalid?

  await addNewRecipe(recipe);

  return res.status(201).json(recipe);
}

async function httpGetAllRecipes(req, res) {
  const recipes = await getAllRecipes(req.user.userId);

  return res.status(200).json(recipes);
}

async function httpGetOneRecipe(req, res) {
  const recipeId = Number(req.params.id);
  const recipe = await getOneRecipe(recipeId);

  return res.status(200).json(recipe);
}

module.exports = {
  httpAddNewRecipe,
  httpGetAllRecipes,
  httpGetOneRecipe
}
