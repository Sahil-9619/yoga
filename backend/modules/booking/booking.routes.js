const express = require('express');
const router = express.Router();
const controller = require('./booking.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.post('/create', controller.create);             // Public
router.get('/all', authMiddleware, controller.getAll); // Admin only
router.delete('/:id', authMiddleware, controller.remove); // Admin only

module.exports = router;
