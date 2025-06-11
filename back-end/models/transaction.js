const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    beneficiary: {
        name: String,
        accountNumber: String,
        bank: String
    },
    fees: {
        type: Number,
        default: 0
    },
    runningBalance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);