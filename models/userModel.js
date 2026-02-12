const {Schema, model} = require('mongoose');
const validator = require('validator');


const passcode_pattern = /^(?=[a-z])(?=.*\d)[a-z0-9]{6}$/;
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
         required: [true, 'Password is required!']
      },
      passcode: {
         type: String,
         trim: true,
         required: [true, 'Passcode is required!'],
         validate: {
            validator: function(value) {
               return passcode_pattern.test(value);
            },
            message: 'Passcode must be lowercase, numbers, 6 characters, and start with lowercase!'
         }
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