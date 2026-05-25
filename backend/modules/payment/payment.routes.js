const express = require("express");
const { createOrder, captureOrder } = require("./payment.controller");

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/capture-order", captureOrder);

module.exports = router;
