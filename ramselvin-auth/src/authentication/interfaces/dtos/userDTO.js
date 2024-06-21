class UserDTO {
    constructor({ username, email, name, password, phone_number, sexo, profile }) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone_number = phone_number;
        this.sexo = sexo;
        this.profile = profile;
    }
}

module.exports = UserDTO;