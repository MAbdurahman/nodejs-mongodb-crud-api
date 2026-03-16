import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';
import setCookieAndToken from '../utils/setCookieAndTokenUtil.js';
import { getFirstName } from '../utils/functionsUtil.js';
import {
	validateEmail,
	validatePassword,
	validateFullname,
} from '../utils/functionsUtil.js';

export const signUpUser = asyncHandler(async (req, res, next) => {
	const { fullname, email, password } = req.body;

	if (!fullname) {
		return next(messageHandler(res, false, 'Fullname is required', 400));
	}
	if (validateFullname(fullname).isValid === false) {
		const { error } = validateFullname(fullname);
		return next(messageHandler(res, false, error, 406));
	}

	if (!email) {
		return next(messageHandler(res, false, 'Email is required', 400));
	}
	if (validateEmail(email).isValid === false) {
		const { error } = validateEmail(email);
		return next(messageHandler(res, false, error, 406));
	}

	if (!password) {
		return next(messageHandler(res, false, 'Password is required', 400));
	}
	if (validatePassword(password).isValid === false) {
		const { error } = validatePassword(password);
		return next(messageHandler(res, false, error, 406));
	}

	/******************** find out if an user already exists ********************/
	const userAlreadyExists = await User?.findOne({ email });

	if (userAlreadyExists) {
		return next(messageHandler(res, false, 'User already exists!', 409));
	}

	/************************* create and save a user *************************/
	const newUser = await User.create({
		fullname,
		email,
		password,
	});

	const { password: pass, ...rest } = newUser._doc;

	res.status(201).json({
		message: `${getFirstName(fullname)} signed up successfully!`,
		success: true,
		user: rest,
	});
});

export const signInUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) {
		return next(messageHandler(res, false, 'Email is required', 400));
	}
	if (validateEmail(email).isValid === false) {
		const { error } = validateEmail(email);
		return next(messageHandler(res, false, error, 406));
	}

	if (!password) {
		return next(messageHandler(res, false, 'Password is required', 400));
	}
	if (validatePassword(password).isValid === false) {
		const { error } = validatePassword(password);
		return next(messageHandler(res, false, error, 406));
	}

	const isValidUser = await User?.findOne({ email }).select('+password');
	if (!isValidUser) {
		return next(messageHandler(res, false, 'User not found!', 404));
	}

	const hasValidPassword = await isValidUser.comparePassword(password);
	if (!hasValidPassword) {
		return next(messageHandler(res, false, 'Invalid credentials!', 401));
	}

   await isValidUser.toggleIsLoggedIn();
	setCookieAndToken(isValidUser, res, 200);
});

export const signOutUser = asyncHandler(async (req, res, next) => {
	const user = req.user;

	if (!user) {
		return next(messageHandler(res, false, 'User not found!', 404));
	}
	await user.toggleIsLoggedIn();

	res.cookie('access_token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		message: 'User signed out successfully!',
		success: true,
		isLoggedIn: user.isLoggedIn,
	});
});

export const getCurrentUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req?.user?._id).select('-password'); 

   res.status(200).json({
      message: `Current user's profile retrieved successfully!`,
      success: true,
      user: user,
   });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;
	const user = await User.findById(req.user.id).select('+password');

	if (!user) {
		return next(messageHandler(res, false, 'User not found!', 404));
	}

	const isOldPasswordValid = await user.comparePassword(oldPassword);
	if (!isOldPasswordValid) {
		return next(messageHandler(res, false, 'Old password is incorrect!', 401));
	}

	if (!newPassword) {
		return next(messageHandler(res, false, 'New password is required', 400));
	}
	if (validatePassword(newPassword).isValid === false) {
		const { error } = validatePassword(newPassword);
		return next(messageHandler(res, false, error, 406));
	}

	user.password = newPassword;
	await user.save();

	setCookieAndToken(user, res, 200);
});

export const updatePasswordAdmin = asyncHandler(async (req, res, next) => {
res.status(200).json({
   message: 'Admin - update password successfully!',
      success: true
   });   
});


export const updateProfile = asyncHandler(async (req, res, next) => {
	res.status(200).json({
		message: 'Update profile successfully!',
		success: true,
	});
});

export const updateProfileAdmin = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      message: 'Admin - update profile successfully!',
      success: true,
   });
});

export const getAllUsersAdmin = asyncHandler(async (req, res, next) => {
	const users = await User.find();

	if (!users) {
		return next(messageHandler(res, false,`This resource ${User} does not exist!`, 404));
	}
	const count = users.length;

	res.status(200).json({
		message: 'All users retrieved successfully!',
		success: true,
		count: count,
		users: users,
	});
});

export const getSingleUserAdmin = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.userId).select('-password');

	if (!user) {
		return next(
			messageHandler(res, false, `User not found with id: ${req.params.userId}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		message: 'Single user retrieved successfully!',
		user: user,
	});
});

export const deleteUserAdmin = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.userId).select('+password');

	if (!user) {
		return next(
			messageHandler(
				res,
				false,
				`User is not found with id: ${req.params.userId}`,
				404
			)
		);
	}

	await User.deleteOne({ _id: user._id });

	res.status(200).json({
		success: true,
		message: 'User deleted successfully!',
		user: {},
	});
});

