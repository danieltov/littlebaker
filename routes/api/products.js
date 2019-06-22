const express = require('express');
const router = express.Router();

// * @route   GET api/products
// * @desc    Test route
// * @access  Public
router.get('/', (req, res) => res.send('Products route'));

module.exports = router;

/*

    ! Build products obj
    ? Do I need this on *THIS* route? No probably not.

    profileFields.products = {};
    if (productName) profileFields.products.productName = productName;
    if (inventory) profileFields.products.inventory = inventory;
    if (price) profileFields.products.price = price;
    if (sold) profileFields.products.sold = sold;
    if (category) profileFields.products.category = category;

    */
