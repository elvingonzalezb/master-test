const UserRepository = require('../../domain/repositories/userRepository');
const User = require('../../domain/entities/user');

class MongooseUserRepository extends UserRepository {
    async save(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
        return await User.findOne({ username })
    }
}

module.exports = MongooseUserRepository;
