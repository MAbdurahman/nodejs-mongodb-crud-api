const express = require('express');
const {
   signUpUser,
   signInUser,
   signOutUser,
   getUserProfile,
   updateFullnameAndEmail,
   getAllUsers,
   getUserDetails,
   updateUserProfile,
   deleteUser
} = require('../controllers/authController');
const {
   authenticateUser,
   authorizeRoles
} = require('./../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/sign-up', signUpUser);
userRouter.post('/sign-in', signInUser);
userRouter.post('/sign-out', signOutUser);
userRouter.get('/profile', authenticateUser, getUserProfile);
userRouter.patch('/profile', authenticateUser, updateFullnameAndEmail);

userRouter.get('/users', authenticateUser, authorizeRoles('admin'), getAllUsers);
userRouter.get('/user/:id', authenticateUser, authorizeRoles('admin'),  getUserDetails);
userRouter.patch('/user/:id', authenticateUser, authorizeRoles('admin'), updateUserProfile);
userRouter.delete('/user/:id', authenticateUser, authorizeRoles('admin'), deleteUser);

module.exports = userRouter;