const mongoose = require( 'mongoose' );
const Base = require( './Base' );

const SellerProfileSchema = new mongoose.Schema( {
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }
} );

const Seller = Base.discriminator( 'Seller', SellerProfileSchema
);

module.exports = mongoose.model( 'seller' );