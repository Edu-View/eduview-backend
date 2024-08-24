// config/corsOptions.js
const cors = require('cors');

const allowedOrigins = [
    'https://eduview.onrender.com', // Add your frontend URL here
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

module.exports = corsOptions;
