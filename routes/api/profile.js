// * ==================== DEPENDENCIES ==================== *//

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Seller = require('../../models/Seller');
const Buyer = require('../../models/Buyer');

// * ==================== ROUTES ==================== *//

// * @route   GET api/profile/me
// * @desc    Get current user profile
// * @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // ! req.user is the authenticated user object. destructure below
    const { accountType, name, email, avatar } = req.user;

    // ! now we can query profile model

    // ! check accountType
    if (accountType === 'Seller') {
      const profile = await Seller.findOne({ user: req.user.id })
        // ! populate with fields we want from User model
        .populate('user', ['name', 'avatar']);
      return res.json(profile);
    } else {
      const profile = await Buyer.findOne({
        user: req.user.id
      })
        // ! populate with fields we want from User model
        .populate('user', ['name', 'avatar']);

      if (!profile)
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });

      res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
