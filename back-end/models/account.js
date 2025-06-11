const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        enum: ['current', 'savings', 'credit'],
        default: 'current'
    },
    balance: {
        type: Number,
        default: 0
    },
    overdraftLimit: {
        type: Number,
        default: 0
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Account', AccountSchema);