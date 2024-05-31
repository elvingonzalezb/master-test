import { slowDown } from 'express-slow-down';

const rateSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    // Add 200 ms of delay to every request after the 10th
    delayMs: (hits) => hits * 200,
    maxDelayMs: 5000,
});

export default rateSlowDown;