const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/my-videos', controller.myVideos); // simple route for auth user if passing ID in query, else need middleware

module.exports = router;
