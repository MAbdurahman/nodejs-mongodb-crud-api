
import express from 'express';
import {authenticateUser, authorizeRoles} from '../middlewares/authMiddleware.js';
import {createProduct, deleteProduct, getSingleProduct, getAllProducts, updateProduct,
   getAllProductsAdmin, getSingleProductAdmin} from '../controllers/productController.js';

const productsRouter = express.Router();

productsRouter.get('/get-all-products', getAllProducts);
productsRouter.get('/:productId', getSingleProduct);

productsRouter.get('/admin/get-all-products', getAllProductsAdmin);
productsRouter.get('/admin/:productId', getSingleProductAdmin);
productsRouter.post('/admin/create-product', createProduct);
productsRouter.put('admin/:productId', updateProduct);
productsRouter.delete('/:productId', deleteProduct);

export default productsRouter;