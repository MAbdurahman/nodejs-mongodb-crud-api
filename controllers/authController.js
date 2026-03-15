import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';
import setCookieAndToken from '../utils/setCookieAndTokenUtil.js';
import {getFirstName} from '../utils/functionsUtil.js';
import {
   validateEmail,
   validatePassword,
   validateFullname
} from '../utils/functionsUtil.js';

export const signUpUser = asyncHandler(async (req, res, next) => {
   const {fullname, email, password} = req.body;

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

   /******************** find out if an user already exists ********************/
   const userAlreadyExists = await User?.findOne({email});

   if (userAlreadyExists) {
      return next(messageHandler(res, false, 'User already exists!', 409));

   }

   /************************* create and save a user *************************/
   const newUser = await User.create({
      fullname,
      email,
      password
   });

   
   const { password: pass, ...rest } = newUser._doc;


   res.status(201).json({
      message: `${getFirstName(fullname)} signed up successfully!`,
      success: true,
      user: rest
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

   const isValidUser = await User?.findOne({email}).select('+password');
   if (!isValidUser) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }

   const hasValidPassword = await isValidUser.comparePassword(password);
   if (!hasValidPassword) {
      return next(messageHandler(res, false, 'Invalid credentials!', 401));
   }

   setCookieAndToken(isValidUser, res, 200);

});

export const signOutUser = asyncHandler(async (req, res, next) => {
   const {userId} = req.params;
   const user = await User.findById(userId);
   
   if (!user) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }
   await user.toggleIsLoggedIn();

   res.cookie('access_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
   });

   res.status(200).json({
      message: 'User signed out successfully!',
      success: true,
      isLoggedIn: user.isLoggedIn
   

   });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
   const {id} = req.params;
   const {password} = req.body;

   if (!password) {
      return next(messageHandler(res, false, 'Password is required', 400));
   }
   if (validatePassword(password).isValid === false) {
      const {error} = validatePassword(password);
      return next(messageHandler(res, false, error, 406));
   }

   const user = await User.findById(id);
   if (!user) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }

   /************************* hashing password *************************/
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);

   console.log(user.password);

   await User.updateOne({id: user.id}, {password}, {new: true});

   const userInformation = await User.findById(user._id)

   res.status(200).json({
      success: true, message: 'Update password successfully!',
      user: userInformation
   });
});

export const updateProfile = asyncHandler(async (req, res, next) => {

   res.status(200).json({
      success: true, message: 'Update profile successfully!'
   });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
   const users = await User.find();

   if (!users) {
      return next(messageHandler(res, false, `This resource ${User} does not exist!`, 404));
   }
   const count = await User.countDocuments({});

   res.status(200).json({
      success: true,
      message: 'All users retrieved successfully!',
      count: count,
      users: users
   });
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id).select('-password');

   if (!user) {
      return next(messageHandler(res, false, `User does not found with id: ${req.params.id}`, 404));
   }

   res.status(200).json({
      success: true,
      message: 'Single user retrieved successfully!',
      user: user
   });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id).select('+password');

   if (!user) {
      return next(messageHandler(res, false, `User is not found with id: ${req.params.id}`, 404));
   }

   await User.deleteOne({_id: user._id});

   res.status(200).json({
      success: true, message: 'User deleted successfully!', user: {}
   });
});

const toggleLoginStatus = asyncHandler(async (userId, res, next) => {
   const user = await User.findById(userId);
   if (!user) {
      return next(messageHandler(res, false, 'User not found!', 404));
   }

   user.isLoggedIn = !user.isLoggedIn; // Toggle the property
   await user.save(); // Save the updated user
   return user; // Return the updated user
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