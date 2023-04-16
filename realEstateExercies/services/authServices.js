const { JWT_Secret } = require('../constants');
const User = require('../models/User');
const jwt = require('../utils/jwt');

exports.register = (userData) => User.create(userData);

exports.login = async ({username,password}) => {
    let user = await User.findOne({username});

    if(!user) {
        throw new Error('Invalid email or password');
    }

    let isValid = user.validatePassword(password);

    if(!isValid) {
        throw new Error('Invalid email or password');
    }

    let payload = {
        _id: user._id,
        username:user.username,
        fullName:user.name
    }

    let token = await jwt.sign(payload, JWT_Secret);

    return token;
}