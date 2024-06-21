const cors = require('cors');

const allowedOrigins = [
    'http://44.218.139.126/',
    'http://localhost:3000',
    'http://localhost:5000'
];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

module.exports = corsOptions;
