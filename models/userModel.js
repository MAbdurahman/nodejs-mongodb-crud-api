import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import validator from 'validator';

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

/************** hash password before saving user ****************/
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10)
});

/********************* compare password ***********************/
userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

/****************** generate JsonWebToken ********************/
userSchema.methods.generateJsonWebToken = function () {
   return jwt.sign({ id: this._id, role: this.role, isLoggedIn: this.isLoggedIn }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
   });
};

/****************** generate resetPasswordToken ********************/
userSchema.methods.generateResetPasswordToken = function () {
   /**************** generate the token ****************/
   const resetToken = crypto.randomBytes(20).toString('hex');

   /**************** hash and set to resetPasswordToken ****************/
   this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

   /**************** set token to expire ****************/
   this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 //30 minutes

   return resetToken;
};

const User = new model('User', userSchema);
export default User;