const express = require('express');
const router = express.Router();
const { getAccounts, getAccount, createAccount } = require('../back-end/Controllers/accountController');
const auth = require('../middlewares/auth');

router.get('/', auth, getAccounts);
router.get('/:id', auth, getAccount);
router.post('/', auth, createAccount);

module.exports = router;