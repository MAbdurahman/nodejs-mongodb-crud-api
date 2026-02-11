const express = require('express');
const {
   createProduct, deleteProduct, getSingleProduct, getAllProducts, updateProduct,
   getAllProductsAdmin, getSingleProductAdmin
} = require('../controllers/productsController');
const {
   authenticateUser,
   authorizeRoles
} = require('../middlewares/authMiddleware');

const productsRouter = express.Router();

productsRouter.route('/').get(getAllProducts)

productsRouter.route('/:productId').get(getSingleProduct)

productsRouter.route('/admin/products').post(authenticateUser, authorizeRoles('admin'), createProduct)
   .get(authenticateUser, authorizeRoles('admin'), getAllProductsAdmin)

productsRouter.route('/admin/products/:productId').get(getSingleProductAdmin)
   .patch(authenticateUser, authorizeRoles('admin'), updateProduct)
   .delete(authenticateUser, authorizeRoles('admin'), deleteProduct)


module.exports = productsRouter;