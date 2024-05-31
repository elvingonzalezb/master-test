import { rateLimit } from 'express-rate-limit';

const mainRatelimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    // add the `RateLimit-*` headers to the response
    standardHeaders: true,
    // Remove the `X-RateLimit-*` headers from the response / por hecer nginx
    legacyHeaders: false,
});

export default mainRatelimiter;