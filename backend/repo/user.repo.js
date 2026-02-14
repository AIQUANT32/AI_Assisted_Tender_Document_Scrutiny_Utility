const User = require("../model/user.model");

exports.createUser = (data) => {
    return User.create(data);
};

exports.findUserByUsername = (username) => {
    return User.findOne(username);
}
