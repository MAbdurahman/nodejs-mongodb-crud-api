import {Schema, model} from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

/****************************** schema ******************************/
const userSchema = new Schema({
   fullname: {
      type: String,
      trim: true,
      required: true
   },
   email: {
      type: String,
      trim: true,
      required: [true, 'Email is required!'],
      unique: [true, 'Email already exists!'],
      validate: [validator?.isEmail, 'Enter a valid email address!']
   },
   password: {
      type: String,
      trim: true,
      required: [true, 'Password is required!'],
      select: false
   },
   passcode: {
      type: String,
      trim: true,
      required: [true, 'Passcode is required!'],
      select: false
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   },
   isLoggedIn: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date
});

/****************** generate password reset token ********************/
userSchema.methods.getResetPasswordToken = function () {
   /**************** generate the token ****************/
   const resetToken = crypto.randomBytes(20).toString('hex');

   /**************** hash and set to resetPasswordToken ****************/
   this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

   /**************** set token to expire ****************/
   this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

   return resetToken;
};

const User = new model('User', userSchema);
export default User;