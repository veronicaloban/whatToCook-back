const express = require('express');

const { httpAddNewRecipe, httpGetAllRecipes, httpGetOneRecipe } = require('./recipes.controller');

const authenticateToken = require('../../utils/authenticateToken');

const recipesRouter = express.Router();

recipesRouter.post('/', authenticateToken, httpAddNewRecipe);
recipesRouter.get('/', authenticateToken, httpGetAllRecipes);
recipesRouter.get('/:id', authenticateToken, httpGetOneRecipe);

module.exports = recipesRouter;
