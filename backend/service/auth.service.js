const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require("../repo/user.repo");

const JWT_SECRET = process.env.JWT_SECRET;
// console.log(JWT_SECRET);

exports.signup = async ({username, password}) => {
    const existingUser = await userRepo.findUserByUsername(username);
    if(existingUser){
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.createUser({username, password: hashedPassword});
    return generateToken(newUser);
}

exports.login = async ({username, password}) => {
    const user = await userRepo.findUserByUsername(username);
    if(!user){
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }

    return generateToken(user);
}

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
}
