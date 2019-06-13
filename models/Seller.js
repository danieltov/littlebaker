const mongoose = require( 'mongoose' );
const Base = require( './Base' );


const Seller = Base.discriminator( 'Seller', new mongoose.Schema( {
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }
} ),
);

module.exports = mongoose.model( 'Seller' );