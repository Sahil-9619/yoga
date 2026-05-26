const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/check-email', controller.checkEmail);
router.get('/my-videos', controller.myVideos); // simple route for auth user if passing ID in query, else need middleware
router.get('/all', authMiddleware, controller.getAllUsers);
router.delete('/:id', authMiddleware, controller.deleteUser);

module.exports = router;
