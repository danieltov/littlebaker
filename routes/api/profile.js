// * ==================== DEPENDENCIES ==================== *//

const express = require( 'express' );
const router = express.Router();
const auth = require( '../../middleware/auth' );

const User = require( '../../models/User' );
const Seller = require( '../../models/Seller' );
const Buyer = require( '../../models/Buyer' );

// * ==================== ROUTES ==================== *//

// * @route   GET api/profile/me
// * @desc    Get current user profile
// * @access  Private
router.get( '/', auth, async ( req, res ) => {
  try {

    const profile = undefined;
    // TODO - Use .findOne({ user: req.user.id }) to find the profile and assign it to profile
    // ? Problem - 

  } catch ( err ) {
    console.error( err.message );
    res.status( 500 ).send( 'Server Error' );
  }
} );

module.exports = router;