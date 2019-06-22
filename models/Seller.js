const mongoose = require('mongoose');
const Base = require('./BaseProfile');

const SellerProfileSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    }
  ]
});

const Seller = Base.discriminator('seller', SellerProfileSchema);

module.exports = mongoose.model('seller');
