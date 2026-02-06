const User = require('../models/userModel.js');
const asyncHandler = require('../utiis/asyncHandlerUtil.js');
const messageHandler = require('../utiis/messageHandlerUtil.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
   validateFullname,
   validateEmail,
   validatePassword
} = require('../utiis/functionsUtil.js');

exports.signUpUser = asyncHandler(async (req, res, next) => {
   const {fullname, email, password} = req.body;

});

exports.signInUser = asyncHandler(async (req, res, next) => {
   const {email, password} = req.body;
});

exports.signOutUser = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'Successfully logged out!'
   });
});