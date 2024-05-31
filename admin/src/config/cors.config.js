import allowedOrigins from './url.config.js';

const NODE_ENV = 'production';

const corsOptionsDev = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const corsOptionsProd = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const corsOptions = NODE_ENV === 'production' ? corsOptionsProd : corsOptionsDev;

export default corsOptions;
