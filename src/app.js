const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./routes/auth/auth.router');
const recipesRouter = require('./routes/recipes/recipes.router');

const app = express();

app.use(helmet());

app.use(cors({
  origin: 'http://localhost:4200',
}));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);

module.exports = app;