const express = require('express');
const router = express.Router();
const controller = require('./video.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const upload = require('../../middleware/upload.middleware');

router.get('/all',         controller.getAll);                                       // Public
router.get('/:id',         controller.getOne);                                       // Public
router.post('/create',     authMiddleware, upload.single('thumbnail'), controller.create);  // Admin
router.put('/:id',         authMiddleware, upload.single('thumbnail'), controller.update);  // Admin
router.delete('/:id',      authMiddleware, controller.remove);                       // Admin

module.exports = router;
