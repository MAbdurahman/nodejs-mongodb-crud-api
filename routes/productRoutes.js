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

/************************** variables **************************/
const productsRouter = express.Router();

/*************************** routes ***************************/
productsRouter.get('/get-all-products', authenticateUser, getAllProducts);
productsRouter.get('/:productId', authenticateUser, getSingleProduct);

productsRouter.get('/admin/get-all-products', authenticateUser, authorizeRoles('admin'), getAllProductsAdmin);
productsRouter.get('/admin/:productId', authenticateUser, authorizeRoles('admin'), getSingleProductAdmin);	
productsRouter.post('/admin/create-product', authenticateUser, authorizeRoles('admin'), createProductAdmin);
productsRouter.put('/admin/:productId', authenticateUser, authorizeRoles('admin'), updateProductAdmin);
productsRouter.delete('admin/:productId', authenticateUser, authorizeRoles('admin'), deleteProductAdmin);

export default productsRouter;
