
import express from 'express';
import { authenticateUser, authorizeRoles } from './../middlewares/authMiddleware.js';
import {
   signUpUser,
   updatePassword,
   updateProfile,
   updateUserProfile,
   deleteUserProfile,
   signInUser,
   getAllUsers,
   forgotPasswordUser,
   getProfile,
   getUserProfile,
   signOutUser,
   resetPasswordUser
} from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.route('/sign-up').post(signUpUser);
userRouter.route('/sign-in').post(signInUser);
userRouter.route('/sign-out').post(signOutUser);

userRouter.route('forgot-password').post(forgotPasswordUser);
userRouter.route('reset-password').patch(resetPasswordUser);

userRouter.route('/user/:userId').get(authenticateUser, getProfile)
   .patch(authenticateUser, updatePassword)
   .patch(authenticateUser, updateProfile);

userRouter.route('/admin/users').get(authenticateUser, authorizeRoles('admin'), getAllUsers);
userRouter.route('/admin/user/:id').get(authenticateUser, authorizeRoles('admin'), getUserProfile)
   .patch(authenticateUser, authorizeRoles('admin'), updateUserProfile)
   .delete(authenticateUser, authorizeRoles('admin'), deleteUserProfile);

export default userRouter;