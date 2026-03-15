/*************************** imports ***************************/
import express from 'express';
import {
	createProduct,
	deleteProduct,
	getSingleProduct,
	getAllProducts,
	updateProduct,
	getAllProductsAdmin,
	getSingleProductAdmin,
} from '../controllers/productController.js';
import {
	authenticateUser,
	authorizeRoles,
} from '../middlewares/authMiddleware.js';

/************************** variables **************************/
const productsRouter = express.Router();

/*************************** routes ***************************/
productsRouter.get('/get-all-products', getAllProducts);
productsRouter.get('/:productId', getSingleProduct);

productsRouter.get('/admin/get-all-products', getAllProductsAdmin);
productsRouter.get('/admin/:productId', getSingleProductAdmin);
productsRouter.post('/admin/create-product', createProduct);
productsRouter.put('admin/:productId', updateProduct);
productsRouter.delete('admin/:productId', deleteProduct);

export default productsRouter;
