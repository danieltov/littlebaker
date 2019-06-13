const express = require('express');
const router = express.Router();

// ! use express-validate to handle validation and responses 
const { check, validationResult } = require('express-validator/check');

// * @route   POST api/users
// * @desc    Register user
// * @access  Public
router.post('/', [

  // ! express-validate functions to validate request body START
  check('name', 'Please enter your full name').not().isEmpty(),
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
  check('accountType', 'Please specify an Account Type').not().isEmpty()
  // ! express-validate functions to validate request body END
], (req, res) => {

    // ! express-validate error catching START
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ! express-validate error catching END

  console.log(req.body);

  res.send('User route')
});

module.exports = router;