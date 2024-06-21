const UserService = require('../../domain/services/userService');
const MongooseUserRepository = require('../../infrastructure/repositories/mongooseUserRepository');

async function loginUser(username, password) {
    const userService = new UserService(new MongooseUserRepository());
    return await userService.login(username, password);
}

module.exports = loginUser;
