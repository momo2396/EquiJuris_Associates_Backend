require('dotenv').config()
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

let genToken = async (payload) => {
    return jwt.sign(payload, secret);
}

module.exports = genToken