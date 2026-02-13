
import express from 'express';
import {authenticateUser, authorizeRoles} from '../middlewares/authMiddleware.js';
import {createProduct, deleteProduct, getSingleProduct, getAllProducts, updateProduct,
   getAllProductsAdmin, getSingleProductAdmin} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.route('/').get(getAllProducts)

productsRouter.route('/:productId').get(getSingleProduct)

productsRouter.route('/admin/products').post(authenticateUser, authorizeRoles('admin'), createProduct)
   .get(authenticateUser, authorizeRoles('admin'), getAllProductsAdmin)

productsRouter.route('/admin/products/:productId').get(getSingleProductAdmin)
   .patch(authenticateUser, authorizeRoles('admin'), updateProduct)
   .delete(authenticateUser, authorizeRoles('admin'), deleteProduct)


export default productsRouter;