const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../Controllers/authController');
const auth = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser);

module.exports = router;