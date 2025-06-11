// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./back-end/models/user');
const Account = require('./back-end/models/account');
const connectDB = require('./back-end/config/db');

// Connect to DB
connectDB();

// Seed function
const seedDB = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Account.deleteMany({});

        // Create users
        const users = [
            {
                name: 'Omphile Mohlala',
                email: 'omphilestudent@gmail.com',
                password: 'password123',
                beneficiaries: [
                    {
                        name: 'John Doe',
                        accountNumber: '1234567890',
                        bank: 'First National Bank',
                        nickname: 'John'
                    }
                ]
            },
            {
                name: 'Thando Mkhatshwa',
                email: 'thando@example.com',
                password: 'password123',
                beneficiaries: [
                    {
                        name: 'Jane Smith',
                        accountNumber: '0987654321',
                        bank: 'Standard Bank',
                        nickname: 'Jane'
                    }
                ]
            }
        ];

        // Hash passwords and create users
        for (let userData of users) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);

            const user = new User(userData);
            await user.save();

            // Create accounts for each user
            const account = new Account({
                user: user._id,
                accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
                accountType: 'current',
                balance: 10000,
                overdraftLimit: 10000
            });

            await account.save();

            // Add account to user
            user.accounts.push(account._id);
            await user.save();
        }

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();