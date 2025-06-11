const express = require('express');
const router = express.Router();
const { getTransactions, makePayment } = require('../Controllers/transactionController');
const auth = require('../middlewares/auth');

router.get('/:accountId/transactions', auth, getTransactions);
router.post('/:accountId/transactions', auth, makePayment);

module.exports = router;