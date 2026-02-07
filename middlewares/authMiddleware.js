const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('../utiis/asyncHandlerUtil.js');
const messageHandler = require('../utiis/messageHandlerUtil.js');
const ErrorHandler = require('../utiis/errorHandlerUtil.js');

const authenticateUser = asyncHandler(async (req, res, next) => {
   const token = req.cookies?.access_token;

   if (!token) {
      return next(messageHandler(res, false, 'Must be signed in!', 401));
   }
   const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findById(decodedData._id).select('-password');

   next();

});

const authorizeRoles = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return next(
            new ErrorHandler(
               `Role: ${req.user.role} is not allowed to access this resource`, 403
            )
         );
      }
      next();
   }
}


module.exports = {authenticateUser, authorizeRoles}