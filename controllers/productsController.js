const Product = require('../models/productModel.js');
const asyncHandler = require('../utils/asyncHandlerUtil.js');


exports.createProduct = asyncHandler(async (req, res, next) => {

   res.statusCode(201).json({
      success: true,
      message: 'Product created successfully!'
   });
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'All products retrieved successfully!'
   });
});

exports.getAllProductsAdmin = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'All products-admin retrieved successfully!'
   })
})

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Product retrieved successfully!'
   });
});

exports.getSingleProductAdmin = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Single product-admin retrieved successfully!'
   })
})

exports.updateProduct = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Product updated successfully!'
   });
});
exports.deleteProduct = asyncHandler(async (req, res, next) => {
   res.statusCode(200).json({
      success: true,
      message: 'Product deleted successfully!'
   });
});