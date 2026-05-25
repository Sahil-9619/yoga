const express = require('express');
const router = express.Router();
const controller = require('./purchase.controller');

router.post('/checkout', controller.checkout);
router.get('/all', controller.getAllPurchases);

module.exports = router;
