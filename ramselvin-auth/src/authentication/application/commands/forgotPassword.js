const UserService = require('../../domain/services/userService');
const UserRepository = require('../../infrastructure/repositories/mongooseUserRepository');

async function forgotPasswordUser(email) {
    const userService = new UserService(new UserRepository());
    return await userService.forgotPassword(email);
}

module.exports = forgotPasswordUser;
