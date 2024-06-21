const UserDTO = require('../dtos/userDTO');
const User = require('../../domain/entities/user');

function toDomain(userDTO) {
    return new User({
        username: userDTO.username,
        email: userDTO.email,
        name: userDTO.name,
        password: userDTO.password,
        phone_number: userDTO.phone_number,
        sexo: userDTO.sexo,
        profile: userDTO.profile
    });
}

function toDTO(user) {
    return new UserDTO({
        username: user.username,
        email: user.email,
        name: user.name,
        password: user.password,
        phone_number: user.phone_number,
        sexo: user.sexo,
        profile: user.profile
    });
}

module.exports = {
    toDomain,
    toDTO
};
