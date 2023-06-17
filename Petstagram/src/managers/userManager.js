const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const SECRET = '7d9ef53a-0b9f-11ee-be56-0242ac120002';

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('We cannot find a matching username!');
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
        throw new Error('Password is invalid!');
    }

    const token = await generateToken(user);

    return token;
};

exports.register = async (userData) => {
    const user = await User.findOne({ username: userData.username });

    if (user) {
        throw new Error('Username already in use!');
    }

    if (userData.password !== userData.repeatPassword) {
        throw new Error('Passwords do not match!');
    }

    const createdUser = User.create(userData);

    const token = await generateToken(createdUser);

    return token;
};

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
}