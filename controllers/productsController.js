
import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';


export const createProduct = asyncHandler(async (req, res, next) => {

   res.statusCode(201).json({
      success: true,
      message: 'Product created successfully!'
   });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'All products retrieved successfully!'
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