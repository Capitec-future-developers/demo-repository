const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Get all transactions for an account
// @route   GET /api/accounts/:accountId/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
    try {
        const account = await Account.findOne({
            _id: req.params.accountId,
            user: req.user.id
        });

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        const transactions = await Transaction.find({
            account: req.params.accountId
        }).sort({ date: -1 });

        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Make a payment
// @route   POST /api/accounts/:accountId/transactions
// @access  Private
exports.makePayment = async (req, res) => {
    const { amount, reference, beneficiary } = req.body;

    try {
        const account = await Account.findById(req.params.accountId);

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        // Check if user owns the account
        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Check sufficient funds
        if (account.balance - amount < -account.overdraftLimit) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }

        // Calculate fees (example: 1% of amount or R5, whichever is higher)
        const fees = Math.max(amount * 0.01, 5);
        const totalAmount = amount + fees;

        // Update account balance
        const newBalance = account.balance - totalAmount;
        account.balance = newBalance;
        await account.save();

        // Create transaction
        const transaction = new Transaction({
            account: account._id,
            type: 'debit',
            amount: totalAmount,
            reference,
            beneficiary,
            fees,
            runningBalance: newBalance
        });

        await transaction.save();

        // Add transaction to account
        account.transactions.push(transaction._id);
        await account.save();

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};