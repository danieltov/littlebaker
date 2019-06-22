// * ==================== DEPENDENCIES ==================== *//

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check'); // ! use express-validate to handle validation and responses

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
      const profile = await Seller.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      );

      if (!profile)
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });

      return res.json(profile);
    } else {
      const profile = await Buyer.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);

      if (!profile)
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });

      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// * @route   POST api/profile/
// * @desc    Create or update profile
// * @access  Private

router.post(
  '/',
  [
    auth,
    [
      // ! express-validate functions to validate request body START
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('handle', 'Handle is required')
        .not()
        .isEmpty()
      // ! express-validate functions to validate request body END
    ]
  ],
  async (req, res) => {
    // ! express-validate error catching START
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    // ! express-validate error catching END

    // ! Destructure req.body
    const {
      company,
      handle,
      website,
      location,
      headline,
      description
    } = req.body;

    // ! Build profile obj
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (handle) profileFields.handle = handle;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (headline) profileFields.headline = headline;
    if (description) profileFields.description = description;

    try {
      if (req.user.accountType === 'Seller') {
        let seller = await Seller.findOne({ user: req.user.id });

        if (seller) {
          // ! Update
          seller = await Seller.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
        }

        // ! Create
        seller = await Seller.create(profileFields);
        return res.json(seller);
      } else {
        let buyer = await Buyer.findOne({
          user: req.user.id
        });

        if (buyer) {
          // ! Update
          buyer = await Buyer.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
        }

        // ! Create
        buyer = await Buyer.create(profileFields);
        return res.json(buyer);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
