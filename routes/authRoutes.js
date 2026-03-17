/*************************** imports ***************************/
import express from 'express';
import {
   signUpUser,
   signInUser,
   signOutUser,
   getCurrentUserProfile,
   updatePassword,
   updateProfile,
   getAllUsersAdmin,
   getSingleUserAdmin,
   updateProfileAdmin,
   deleteUserAdmin
} from '../controllers/authController.js';
import { authenticateUser, authorizeRoles } from '../middlewares/authMiddleware.js';

/************************** variables ***************************/
const router = express.Router();

/**************************** routes ****************************/
router.post('/auth/sign-up', signUpUser);
router.post('/auth/sign-in', signInUser);
router.post('/auth/sign-out', authenticateUser, signOutUser);
router.get('/auth/users', authenticateUser, getCurrentUserProfile);
router.patch('/auth/users', authenticateUser, updatePassword);
router.put('/auth/users', authenticateUser, updateProfile);

/************************* admin routes *************************/
router.get('/admin/auth/users', authenticateUser, authorizeRoles('admin'), getAllUsersAdmin);
router.get('/admin/auth/users/:userId', authenticateUser, authorizeRoles('admin'),getSingleUserAdmin);
router.put('/admin/auth/users/:userId', authenticateUser, authorizeRoles('admin'),   updateProfileAdmin);
router.delete('/admin/auth/users/:userId', authenticateUser, authorizeRoles('admin'), deleteUserAdmin);

export default router;