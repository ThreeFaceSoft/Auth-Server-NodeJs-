const Router = require('express').Router;
const authController = require('../controllers/auth.controller');
// const {signUp, signIn, signOut} = require('../controllers/auth.controller');

const authRouter = new Router();

authRouter.post('/signUp', authController.signUp);
authRouter.post('/signIn', authController.signIn);
authRouter.post('/signOut', authController.signOut);

module.exports = authRouter;