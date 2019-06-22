const mongoose = require('mongoose');
const Base = require('./BaseProfile');

const BuyerProfileSchema = new mongoose.Schema({
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    }
  ]
});

const Buyer = Base.discriminator('buyer', BuyerProfileSchema);

module.exports = mongoose.model('buyer');
