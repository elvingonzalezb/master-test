const bcryptService = require('../../infrastructure/security/bcryptService');
const jwtTokenService = require('../../infrastructure/security/jwtTokenService');
const UserDTO = require('../../interfaces/dtos/userDTO');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        const hashedPassword = await bcryptService.hashPassword(userData.password);
        const user = new UserDTO({
            ...userData,
            password: hashedPassword
        });
        return await this.userRepository.save(user);
    }

    async login(username, password) {
        const user = await this.userRepository.findByUsername(username);
        console.log(username, password);
        if (user && await bcryptService.comparePassword(password, user.password)) {
            return jwtTokenService.generateToken(user);
        }
        throw new Error('Invalid username or password');
    }

    async forgotPassword(email) {
        //TODO: Implement forgot password logic here
    }

    async someMethodWithRateLimiting(req, res) {
        limiter(req, res, () => {    
        res.send('Rate limited method');
        });
    }
}

module.exports = UserService;
