import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';
import APIFeatures from '../utils/apiFeaturesUtil.js';

export const createProductAdmin = asyncHandler(async (req, res, next) => {
	req.body.adminUser = req.user._id;
   const product = await Product.create(req.body);

	res.status(201).json({
		message: 'Admin - product created successfully!',
		success: true,
      product
	});
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
	const resPerPage = 4;
	const productsCount = await Product.countDocuments();

	const apiFeatures = new APIFeatures(Product.find(), req.query)
		.search()
		.filter()
		

	let products = await apiFeatures.query;
	let filteredProducts = products.length;

	apiFeatures.pagination(resPerPage);
	products = await apiFeatures.query.clone();
	

	res.status(200).json({
		message: 'Products retrieved successfully!',
		success: true,
		filteredProducts: filteredProducts,
		productsCount: productsCount,
		resultsPerPage: resPerPage,
		products,
	});
});

export const getAllProductsAdmin = asyncHandler(async (req, res, next) => {
	const products = await Product.find().sort({name: 1});
	const productsCount = products.length;

	res.status(200).json({
		message: 'Admin - all products retrieved successfully!',
		productsCount,
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

export const updateProductAdmin = asyncHandler(async (req, res, next) => {
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
		message: 'Admin - product updated successfully!',
		success: true,
		product,
	});
});

export const deleteProductAdmin= asyncHandler(async (req, res, next) => {
	const { productId } = req.params;
	let product = await Product.findById(productId);

	if (!product) {
		return next(messageHandler(res, 'Product not found!', 404));
	}

	await Product.deleteOne({_id: product._id});

	res.status(200).json({
		message: 'Admin - product deleted successfully!',
		success: true,
		user: {},
	});
});