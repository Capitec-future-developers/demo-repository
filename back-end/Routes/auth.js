const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../Controllers/authController');
const auth = require('../middlewares/auth');

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Get User Route (protected)
router.get('/user', auth, getUser);

module.exports = router;
