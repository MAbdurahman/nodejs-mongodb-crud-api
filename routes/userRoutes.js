const express = require('express');
const {signUpUser, signInUser, signOutUser} = require('./../controllers/userController');
const {authenticateUser,  authorizeRoles} = require('./../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/sign-up', signUpUser);
userRouter.post('/sign-in', signInUser);
userRouter.get('/sign-out', signOutUser);

module.exports = userRouter;