const mongoose = require( 'mongoose' );
const Base = require( './Base' );

const BuyerProfileSchema = new mongoose.Schema( {
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }
} );

const Buyer = Base.discriminator( 'Buyer', BuyerProfileSchema );

module.exports = mongoose.model( 'buyer' );