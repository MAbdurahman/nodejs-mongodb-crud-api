import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandlerUtil.js';
import messageHandler from '../utils/messageHandlerUtil.js';
import ErrorHandler from '../utils/errorHandlerUtil.js';

export const authenticateUser = asyncHandler(async (req, res, next) => {
   const token = req.cookies?.access_token;

   if (!token) {
      return next(messageHandler(res, false, 'Must be signed in!', 401));
   }
   const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User?.findById(decodedData._id).select('-password');

   next();

});

export const authorizeRoles = (...roles) => {
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