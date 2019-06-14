const mongoose = require( 'mongoose' );

const BaseProfileSchema = new mongoose.Schema( {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  headline: {
    type: String,
  },
  description: {
    type: String,
  }
} );

const baseOptions = {
  discriminatorKey: 'profileType',
  collection: 'profiles'
};

module.exports = Base = mongoose.model( 'base', BaseProfileSchema, baseOptions );