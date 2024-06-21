const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'el5adce9449770680910741063cd0a3fe0acb62a8978661f421bbcbb66dc48e8';
const JWT_ALGORITHM = "HS256";
const JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 120
const JWT_REFRESH_TOKEN_EXPIRE_MINUTES = 1440

function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    generateToken
};
