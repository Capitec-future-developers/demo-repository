const Account = require('../models/account');
const User = require('../models/user');
const Transaction = require('../models/transaction');

// @desc    Get all accounts for a user
// @route   GET /api/accounts
// @access  Private
exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.user.id })
            .populate('transactions')
            .sort({ createdAt: -1 });

        res.json(accounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get single account
// @route   GET /api/accounts/:id
// @access  Private
exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findOne({
            _id: req.params.id,
            user: req.user.id
        }).populate('transactions');

        if (!account) {
            return res.status(404).json({ msg: 'Account not found' });
        }

        res.json(account);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Account not found' });
        }
        res.status(500).send('Server error');
    }
};

// @desc    Create a new account
// @route   POST /api/accounts
// @access  Private
exports.createAccount = async (req, res) => {
    const { accountType, balance, overdraftLimit } = req.body;

    try {
        // Generate a random account number
        const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        const newAccount = new Account({
            user: req.user.id,
            accountNumber,
            accountType,
            balance,
            overdraftLimit
        });

        const account = await newAccount.save();

        // Add account to user
        await User.findByIdAndUpdate(req.user.id, {
            $push: { accounts: account._id }
        });

        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};