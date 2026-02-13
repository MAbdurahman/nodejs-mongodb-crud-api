const {Schema, model, Types: {Decimal128}} = require('mongoose');

const productSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Enter the product name!'],
      trim: true
   },
   description: {
      type: String,
      required: [true, 'Enter the product description!']
   },
   price: {
      type: Decimal128,
      required: [true, 'Enter the product price!'],
      max: [8, 'The product price cannot greater than eight digits.!']
   },
   ratings: {
      type: Number,
      min: [0, 'Ratings must be between 0 and 5.'],
      max: [5, 'Ratings must be between 0 and 5.'],
      default: 0
   },
   images: [
      {
         public_id: {
            type: String,
            required: true
         },
         url: {
            type: String,
            required: true
         }
      }
   ],
   category: {
      type: String,
      required: [true, 'Enter product category!'],
      enum: ['book', 'course', 'clothing', 'electronics', 'furniture', 'technology']
   },
   stock: {
      type: Number,
      required: [true, 'Enter product stock!'],
      maxLength: [4, 'Stock cannot exceed 4 characters!'],
      default: 1
   },
   numOfReviews: {
      type: Number,
      default: 0
   },
   reviews: [
      {
         user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
         },
         name: {
            type: String,
            required: true
         },
         rating: {
            type: Number,
            required: true
         },
         comment: {
            type: String,
            required: true
         }
      }
   ],

   adminUser: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Product = new model('Product', productSchema);
module.exports = Product;