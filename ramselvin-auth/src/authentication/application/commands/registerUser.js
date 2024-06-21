const UserService = require('../../domain/services/userService');
const MongooseUserRepository = require('../../infrastructure/repositories/mongooseUserRepository');

async function registerUser(userData) {
    const userService = new UserService(new MongooseUserRepository());
    return await userService.register(userData);
}

module.exports = registerUser;
