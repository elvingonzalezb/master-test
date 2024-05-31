import express from 'express';
import mainRatelimiter from '../middlewares/ratelimit.middleware.js';
import rateSlowDown from '../middlewares/slowdown.middleware.js';

const router = express.Router();

router.get('/main', mainRatelimiter, (req, res) => {
    console.log(`Recibiendo y enviando datos desde node code /admin: ${req.method} ${req.url}`);
    res.status(200).send('Response from Service code admin Node');
});

router.get('/health', (req, res) => { 
    res.status(200).send('Check health');
});

router.get('/slow', rateSlowDown, (req, res) => {
    res.status(200).send('Testing slow limit request');
});

export default router;
