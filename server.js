const express = require('express');
const connectDB = require('./back-end/config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./back-end/Routes/auth'));
app.use('/api/account', require('./back-end/Routes/accounts'));
app.use('/api/transactions', require('./back-end/Routes/transactions'));

// Serve static files from front-end in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../front-end')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../front-end', 'Longin.html')); // check this file name spelling: "Longin.html" or "Login.html"?
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
