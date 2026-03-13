import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';

export const createProduct = asyncHandler(async (req, res, next) => {

	res.statusCode(201).json({
		success: true,
		message: 'Product created successfully!',
	});
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find();

	if (!products) {
		return next(messageHandler(res, 'Products not found!', 404));
	}
	const count = await Product.countDocuments();

	res.status(200).json({
		count: count,
		message: 'All products for user retrieved successfully!',
		success: true,
		products: products,
	});
});

export const getAllProductsAdmin = asyncHandler(async (req, res, next) => {
	const products = await Product.find();

	res.status(200).json({
		message: 'Admin - all products retrieved successfully!',
		success: true,
		products,
	});
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);
	if (!product) {
		return next(messageHandler(res, 'Product not found!', 404));
	}
	res.status(200).json({
		message: 'Product retrieved successfully!',
		success: true,
		product,
	});
});

export const getSingleProductAdmin = asyncHandler(async (req, res, next) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);

	if (!product) {
		return next(messageHandler(res, 'Product not found!', 404));
	}
	res.status(200).json({
		message: 'Admin - product retrieved successfully!',
		success: true,
		product,
	});
});


export const updateProduct = asyncHandler(async (req, res, next) => {
	const { productId } = req.params;
	let product = await Product.findById(productId);

	if (!product) {
		return next(messageHandler(res, 'Product not found!', 404));
	}

	product = await Product.findByIdAndUpdate(productId, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		message: 'Product updated successfully!',
		success: true,
		product,
	});
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
	const { productId } = req.params;
	let product = await Product.findById(productId);

	if (!product) {
		return next(messageHandler(res, 'Product not found!', 404));
	}

	await product.deleteOne();

	res.status(200).json({
		message: 'Product deleted successfully!',
		success: true,
		user: {},
	});
});
