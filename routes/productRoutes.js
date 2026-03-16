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
const productsRouter = express.Router();

/**************************** routes ****************************/
productsRouter.get('/products/get-all-products', authenticateUser, getAllProducts);
productsRouter.get('/products/:productId', authenticateUser, getSingleProduct);

/************************* admin routes *************************/
productsRouter.get('/admin/products/get-all-products', authenticateUser, authorizeRoles('admin'), getAllProductsAdmin);
productsRouter.get('/admin/products/:productId', authenticateUser, authorizeRoles('admin'), getSingleProductAdmin);	
productsRouter.post('/admin/products/create-product', authenticateUser, authorizeRoles('admin'), createProductAdmin);
productsRouter.put('/admin/products/:productId', authenticateUser, authorizeRoles('admin'), updateProductAdmin);
productsRouter.delete('/admin/products/:productId', authenticateUser, authorizeRoles('admin'), deleteProductAdmin);

export default productsRouter;
