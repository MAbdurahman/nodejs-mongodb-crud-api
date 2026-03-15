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

/************************** variables **************************/
const authRouter = express.Router();

/*************************** routes ***************************/
authRouter.post('/sign-up', signUpUser);
authRouter.post('/sign-in', signInUser);
authRouter.post('/sign-out/', authenticateUser, signOutUser);

authRouter.patch('/update-password/:userId', updatePassword);
authRouter.put('/update-profile/:userId', updateProfile);

authRouter.get('/get-all-users', getAllUsers);
authRouter.get('/get-user/:userId', getSingleUser);

authRouter.delete('/delete-user/:userId', deleteUser)

export default authRouter;