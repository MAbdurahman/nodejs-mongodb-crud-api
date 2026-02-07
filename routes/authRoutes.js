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
} = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/sign-up', signUpUser);
userRouter.post('/sign-in', signInUser);
userRouter.post('/sign-out', signOutUser);
userRouter.get('/profile', authenticateUser, getUserProfile);
userRouter.patch('/profile', authenticateUser, updateFullnameAndEmail);

userRouter.get('/admin/users', authenticateUser, authorizeRoles('admin'), getAllUsers);
userRouter.get('/admin/user/:id', authenticateUser, authorizeRoles('admin'),  getUserDetails);
userRouter.patch('/admin/user/:id', authenticateUser, authorizeRoles('admin'), updateUserProfile);
userRouter.delete('/admin/user/:id', authenticateUser, authorizeRoles('admin'), deleteUser);

module.exports = userRouter;