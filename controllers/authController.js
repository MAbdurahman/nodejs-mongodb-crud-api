import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';
import {validatePasscode, validateEmail, validatePassword, validateFullname} from '../utils/functionsUtil.js';

export const signUpUser = asyncHandler(async (req, res, next) => {
   const {fullname, email, password, passcode} = req.body;

   if (!fullname) {
      return next(messageHandler(res, false, 'Fullname is required', 400));
   }
   if (validateFullname(fullname).isValid === false) {
      const {error} = validateFullname(fullname);
      return next(messageHandler(res, false, error, 406));
   }

   if (!email) {
      return next(messageHandler(res, false, 'Email is required', 400));
   }
   if (validateEmail(email).isValid === false) {
      const {error} = validateEmail(email);
      return next(messageHandler(res, false, error, 406));
   }

   if (!password) {
      return next(messageHandler(res, false, 'Password is required', 400));
   }
   if (validatePassword(password).isValid === false) {
      const {error} = validatePassword(password);
      return next(messageHandler(res, false, error, 406));
   }
   if (!passcode) {
      return next(messageHandler(res, false, 'Passcode is required', 400));
   }
   if (validatePasscode(passcode).isValid === false) {
      const {error} = validatePasscode(passcode);
      return next(messageHandler(res, false, error, 406));
   }

   /************************* find out if a user already exists *************************/
   const userAlreadyExists = await User?.findOne({email});

   if (userAlreadyExists) {
      return next(messageHandler(res, false, 'User already exists!', 409));

   }
   /************************* hashing password *************************/
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const hashedPasscode = await bcrypt.hash(passcode, salt);

   /************************* create and save a user *************************/
   const newUser = await new User({
      fullname, email, password: hashedPassword, passcode: hashedPasscode
   });

   const user = await newUser.save();
   /************************* successful response *************************/
   res.status(201).json({
      success: true, message: 'User created successfully!', user: {
         ...user._doc, password: null, passcode: null
      }
   });

});

export const signInUser = asyncHandler(async (req, res, next) => {
   const {email, password} = req.body;

   if (!email) {
      return next(messageHandler(res, false, 'Email is required', 400));
   }
   if (validateEmail(email).isValid === false) {
      const {error} = validateEmail(email);
      return next(messageHandler(res, false, error, 406));
   }

   if (!password) {
      return next(messageHandler(res, false, 'Password is required', 400));
   }
   if (validatePassword(password).isValid === false) {
      const {error} = validatePassword(password);
      return next(messageHandler(res, false, error, 406));
   }

   const isValidUser = await User?.findOne({email});
   if (!isValidUser) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }

   const hasValidPassword = await bcrypt.compare(password, isValidUser?.password);
   if (!hasValidPassword) {
      return next(messageHandler(res, false, 'Invalid credentials!', 401));
   }

   const token = jwt.sign({
      id: isValidUser._id,
      role: isValidUser?.role,
      isLoggedIn: isValidUser.isLoggedIn = true
   }, process.env.JWT_SECRET);
   const {password: pass, ...rest} = isValidUser._doc;

   const milliseconds_minute = 60000;
   const milliseconds_hour = milliseconds_minute * 60;
   const milliseconds_day = milliseconds_hour * 24;
   const milliseconds_week = milliseconds_day * 7;
   const expiryDate = new Date(Date.now() + milliseconds_week);

   res.cookie('access_token', token, {httpOnly: true, expires: expiryDate})
      .status(200).json({
      success: true, message: 'User signed in successfully!', rest
   });

});

export const signOutUser = asyncHandler(async (req, res, next) => {
   const {id} = req.user;
   const user = await User?.findById(id).select('-password');
   if (!user) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }

   user.isLoggedIn = false;

   await user.save();
   res.clearCookie('access_token');
   res.status(200).json({
      success: true, message: 'User signed out successfully!',
      user: user
   });
});

export const forgotPasswordUser = asyncHandler(async (req, res, next) => {

   res.status(200).json({
      success: true, message: 'Forgot password user!'
   });
});

export const resetPasswordUser = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true, message: 'Reset password user!'
   });
});

export const getProfile = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true, message: 'Profile retrieved successfully!'
   });
});

export const updatePassword = asyncHandler(async (req, res, next) => {

   res.status(200).json({
      success: true, message: 'Update password successfully!'
   });
});


export const updateProfile = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true, message: 'Update profile successfully!'
   });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'All users retrieved successfully!',
      users: await User.find()
   });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true, message: 'User details retrieved successfully!', user: req.user
   });
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true, message: 'User profile updated successfully!', user: req.user
   })
});

export const deleteUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id);

   if (!user) {
      return next(messageHandler(res, false, `User is not found with id: ${req.params.id}`, 404));
   }
   await user.remove();

   res.status(200).json({
      success: true, message: 'User deleted successfully!', user: null
   });
});





/*exports.getUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user.id).select('-password');
   if (!user) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }
   res.status(200).json({
      success: true, message: 'User profile retrieved successfully!', user
   });
});

exports.updateFullnameAndEmail = asyncHandler(async (req, res, next) => {
   const {fullname, email} = req.body;

   if (!fullname) {
      return next(messageHandler(res, false, 'Fullname is required', 400));
   }
   if (validateFullname(fullname).isValid === false) {
      const {error} = validateFullname(fullname);
      return next(messageHandler(res, false, error, 406));
   }

   if (!email) {
      return next(messageHandler(res, false, 'Email is required', 400));
   }
   if (validateEmail(email).isValid === false) {
      const {error} = validateEmail(email);
      return next(messageHandler(res, false, error, 406));
   }

   /!************************* find out if a user already exists *************************!/
   const userAlreadyExists = await User.findOne({email});

   if (userAlreadyExists) {
      return next(messageHandler(res, false, 'User already exists!', 409));

   }
   /!************************* find by id and update *************************!/

   const newUserData = {
      fullname, email
   };

   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true, runValidators: true, useFindAndModify: false
   });

   res.status(200).json({
      success: true,
      message: 'User profile updated successfully!',
      user
   });
});*/