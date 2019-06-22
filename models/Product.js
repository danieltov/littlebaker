const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  inventory: {
    type: Number,
    required: true
  },
  sold: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller'
  },
  buyers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer'
  }
});
module.exports = Product = mongoose.model('product', UserSchema, 'products');
