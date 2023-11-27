const recipesDB = require('./recipes.mongo');
const usersDB = require('../users/users.mongo');

const DEFAULT_RECIPE_ID = 0;

async function addNewRecipe(recipe) {
  const newRecipeId = await getLatestRecipeId() + 1;

  const newRecipe = Object.assign(recipe, {
    id: newRecipeId
  });

  console.log(newRecipe, 'newRecipe');

  await saveRecipe(newRecipe);
}

async function getLatestRecipeId() {
  const latestRecipe = await recipesDB
    .findOne()
    .sort('-id');

    console.log(latestRecipe, 'latestRecipe');

  if(!latestRecipe) {
    return DEFAULT_RECIPE_ID;
  }

  return latestRecipe.id;
}

async function saveRecipe(recipe) {
  const savedRecipe = await recipesDB.findOneAndUpdate({
    id: recipe.id,
  }, recipe, {
    upsert: true,
    new: true
  })

  const user = await usersDB.findByIdAndUpdate(
    recipe.author,
    { $push: { recipes: savedRecipe._id } },
    { new: true }
  );
  console.log(user, 'updated user')
}

async function getAllRecipes(userId) { //we shoud get recipes of a certain user
  // return await recipesDB.find({}, {'_id': 0, '__v': 0})
  return await recipesDB.find({author: userId})
}

async function getOneRecipe(recipeId) {
  const recipe = await recipesDB.findOne({
    id: recipeId
  });

  return recipe
}

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getOneRecipe
}
