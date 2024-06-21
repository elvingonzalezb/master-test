const registerUser = require('../../application/commands/registerUser');
const loginUser = require('../../application/commands/loginUser');
const forgotPasswordUser = require('../../application/commands/forgotPassword');

async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const token = await loginUser(req.body.username, req.body.password);
        res.status(200).json({ 
            token_type: 'Bearer',
            token,
            detail: 'Successfully login' 
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function forgotPassword(req, res) {
    try {
        await forgotPasswordUser(req.body.email);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    forgotPassword
};
