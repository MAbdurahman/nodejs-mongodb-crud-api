const { Schema, model} = require('mongoose');

const productSchema = new Schema({
   name: {
      type: String,
      required: [true, "Enter the product name!"],
      trim: true,
   },
   description: {
      type: String,
      required: [true, "Enter the product description!"],
   },
   price: {
      type: Number,
      required: [true, "Enter the product price!"],
      max: [5, "The product price cannot greater than five digits.!"],
   },
   ratings: {
      type: Number,
      min: [1, 'Ratings must be between 1 and 5.'],
      max: [5, 'Ratings must be between 1 and 5.'],
      default: 0,
   },
   images: [
      {
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
   category: {
      type: String,
      required: [true, "Please Enter Product Category"],
      enum: ['Technology', 'Electronics', 'Books', 'Furniture', 'Clothing']
   },
   Stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
   },
   numOfReviews: {
      type: Number,
      default: 0,
   },
   reviews: [
      {
         user: {
            type: Schema.ObjectId,
            ref: "User",
            required: true,
         },
         name: {
            type: String,
            required: true,
         },
         rating: {
            type: Number,
            required: true,
         },
         comment: {
            type: String,
            required: true,
         },
      },
   ],

   adminUser: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Product = new model("Product", productSchema);
module.exports = Product;