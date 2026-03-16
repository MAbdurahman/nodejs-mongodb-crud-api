/*************************** imports ***************************/
import express from 'express';
import {
   signUpUser,
   signInUser,
   signOutUser,
   updatePassword,
   updateProfile,
   getAllUsersAdmin,
   getSingleUserAdmin,
   updatePasswordAdmin,
   updateProfileAdmin,
   deleteUserAdmin
} from '../controllers/authController.js';
import { authenticateUser, authorizeRoles } from '../middlewares/authMiddleware.js';

/************************** variables ***************************/
const authRouter = express.Router();

/**************************** routes ****************************/
authRouter.post('/auth/sign-up', signUpUser);
authRouter.post('/auth/sign-in', signInUser);
authRouter.post('/auth/sign-out', authenticateUser, signOutUser);
authRouter.patch('/auth/update-password/:userId', authenticateUser, updatePassword);
authRouter.put('/auth/update-profile/:userId', authenticateUser, updateProfile);

/************************* admin routes *************************/
authRouter.get('/admin/auth/get-all-users', authenticateUser, authorizeRoles('admin'), 
getAllUsersAdmin);
authRouter.get('/admin/auth/get-all-users/:userId', authenticateUser, authorizeRoles('admin'),getSingleUserAdmin);
authRouter.patch('/admin/auth/get-all-users/:userId',authenticateUser, authorizeRoles('admin'), updatePasswordAdmin);
authRouter.put('/admin/auth/get-all-users/:userId', authenticateUser, authorizeRoles('admin'),   updateProfileAdmin);
authRouter.delete('/admin/auth/get-all-users/:userId', authenticateUser, authorizeRoles('admin'), deleteUserAdmin);

export default authRouter;