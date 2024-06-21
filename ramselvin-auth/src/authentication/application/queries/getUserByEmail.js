const UserRepository = require('../../infrastructure/repositories/mongooseUserRepository');

async function getUserByEmail(email) {
    const userRepository = new UserRepository();
    return await userRepository.findByEmail(email);
}

module.exports = getUserByEmail;
