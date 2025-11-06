const express = require('express');
const router = express.Router();

router.use('/products', require('./productRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/vendors', require('./vendorRoutes'));
router.use('/qtydetails', require('./qtyDetailRoutes'));

module.exports = router;
