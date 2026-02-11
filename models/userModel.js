const {Schema, model} = require('mongoose');


const passCode_pattern = /^\d{6}$/;
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
         unique: [true, 'Email already exists!']

      },
      password: {
         type: String,
         trim: true,
         required: [true, 'Password is required!']
      },
      passCode: {
         type: Number,
         trim: true,
         required: [true, 'Passcode is required!'],
         match: [passCode_pattern, 'PassCode must be 6 digits!']
      },
      role: {
         type: String,
         enum: ['user', 'admin'],
         default: 'user'
      },
      isLoggedIn: {
         type: Boolean,
         default: false
      }
   },
   {timestamps: true}
);

const User = new model('User', userSchema);
module.exports = User;