const express = require('express');
const router = express.Router();
const controller = require('./purchase.controller');

router.post('/checkout', controller.checkout);

module.exports = router;
