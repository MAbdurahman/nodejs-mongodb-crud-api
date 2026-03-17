/*************************** imports ***************************/
import express from 'express';
import {
	getAllProducts,
	getSingleProduct,
	getAllProductsAdmin,
	getSingleProductAdmin,
	createProductAdmin,
	deleteProductAdmin,
	updateProductAdmin,
} from '../controllers/productController.js';
import {
	authenticateUser,
	authorizeRoles,
} from '../middlewares/authMiddleware.js';

/*************************** variables ***************************/
const router = express.Router();

/**************************** routes ****************************/
router.get('/products', authenticateUser, getAllProducts);
router.get('/products/:productId', authenticateUser, getSingleProduct);

/************************* admin routes *************************/
router.post('/admin/products', authenticateUser, authorizeRoles('admin'), createProductAdmin);
router.get('/admin/products', authenticateUser, authorizeRoles('admin'), getAllProductsAdmin);
router.get('/admin/products/:productId', authenticateUser, authorizeRoles('admin'),getSingleProductAdmin);
router.put('/admin/products/:productId', authenticateUser, authorizeRoles('admin'), updateProductAdmin);
router.delete('/admin/products/:productId', authenticateUser, authorizeRoles('admin'),deleteProductAdmin);

export default router;