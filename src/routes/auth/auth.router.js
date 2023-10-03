const express = require('express');
const authRouter = express.Router();

const { httpLoginUser, httpAddNewUser, httpCheckExistingEmail, httpCheckExistingLogin } = require('./auth.controller');

authRouter.post('/login', httpLoginUser);
authRouter.post('/signup', httpAddNewUser);
authRouter.post('/checkExistingEmail', httpCheckExistingEmail);
authRouter.post('/checkExistingLogin', httpCheckExistingLogin);

module.exports = authRouter;
