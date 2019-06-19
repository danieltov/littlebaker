// * ==================== DEPENDENCIES ==================== *//
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();
const { check, validationResult } = require('express-validator/check'); // ! use express-validate to handle validation and responses
const User = require('../../models/User');

// * ==================== ROUTES ==================== *//

// * @route   POST api/users
// * @desc    Register user
// * @access  Public
router.post(
  '/',
  [
    // ! express-validate functions to validate request body START
    check('name', 'Please enter your full name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
    check('accountType', 'Please specify an Account Type')
      .not()
      .isEmpty()
    // ! express-validate functions to validate request body END
  ],
  async (req, res) => {
    // ! express-validate error catching START
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ! express-validate error catching END

    const { name, email, password, accountType } = req.body;

    try {
      // * See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // * Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // * Create an instance of the user
      user = new User({ name, email, avatar, password, accountType });

      // * Encrypt password with bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // * Save user to database
      await user.save();

      // * Return jsonwebtoken
      const payload = { user: { id: user.id, accountType: user.accountType } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
