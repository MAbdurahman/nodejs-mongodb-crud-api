const { Schema, Model} = require('mongoose');

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
      role: {
         type: String,
         enum: ['user', 'admin'],
         default: 'user'
      }
   },
   {timestamps: true}
);

const User = new Model('User', userSchema);
module.exports = User;