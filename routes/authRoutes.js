/*************************** imports ***************************/
import express from 'express';
import {
   signUpUser,
   signInUser,
   signOutUser,
   updatePassword,
   updateProfile,
   getAllUsers,
   getSingleUser,
   deleteUser
} from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

/************************** variables ***************************/
const authRouter = express.Router();

/**************************** routes ****************************/
authRouter.post('/auth/sign-up', signUpUser);
authRouter.post('/auth/sign-in', signInUser);
authRouter.post('/auth/sign-out', authenticateUser, signOutUser);

/************************* admin routes *************************/
authRouter.patch('/auth/update-password/:userId', updatePassword);
authRouter.put('/auth/update-profile/:userId', updateProfile);

authRouter.get('/auth/get-all-users', getAllUsers);
authRouter.get('/auth/get-user/:userId', getSingleUser);

authRouter.delete('/auth/delete-user/:userId', deleteUser);

export default authRouter;