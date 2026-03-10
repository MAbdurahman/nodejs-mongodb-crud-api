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

/************************** variables **************************/
const authRouter = express.Router();

/*************************** routes ***************************/
authRouter.post('/sign-up', signUpUser);
authRouter.post('/sign-in', signInUser);
authRouter.post('/sign-out', signOutUser);

authRouter.patch('/update-password/:id', updatePassword);
authRouter.put('/update-profile/:id', updateProfile);

authRouter.get('/get-all-users', getAllUsers);
authRouter.get('/get-user/:id', getSingleUser);

authRouter.delete('/delete-user/:id', deleteUser)

export default authRouter;