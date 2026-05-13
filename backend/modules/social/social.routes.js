const express = require('express');
const router = express.Router();
const controller = require('./social.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.get('/all', controller.getAll);                    // Public — used by footer/about
router.put('/update', authMiddleware, controller.update); // Admin only

module.exports = router;
