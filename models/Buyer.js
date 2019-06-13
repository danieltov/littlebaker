const mongoose = require( 'mongoose' );
const Base = require( './Base' );


const Buyer = Base.discriminator( 'Buyer', new mongoose.Schema( {
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }
} ),
);

module.exports = mongoose.model( 'Buyer' );