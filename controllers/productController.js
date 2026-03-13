
import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';
import productsRouter from '../routes/productRoutes.js';

export const createProduct = asyncHandler(async (req, res, next) => {

   res.statusCode(201).json({
      success: true,
      message: 'Product created successfully!'
   });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
   const products = await Product.find();

   if (!products) {
      return next(messageHandler(res, 'Products not found!', 404));
   }


   res.statusCode(200).json({
      message: 'All products for user retrieved successfully!',
      success: true,
      products: products,
   });

});

export const getAllProductsAdmin = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'All products-admin retrieved successfully!'
   })
})

export const getSingleProduct = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Product retrieved successfully!'
   });
});

export const getSingleProductAdmin = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Single product-admin retrieved successfully!'
   })
})

export const updateProduct = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Product updated successfully!'
   });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Product deleted successfully!'
   });
});