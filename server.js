const express = require('express');
const connectDB = require('./back-end/config/db');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./back-end/Routes/auth'));
app.use('/api/account', require('./back-end/Routes/accounts'));
app.use('/api/transactions', require('./back-end/Routes/transactions'));

// Serve static files from the root folder (where Login.html is)
app.use(express.static(__dirname));

// Serve Login.html when visiting '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
