require('dotenv').config()
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

let roleCheck = async (token) => {
    try {
        let decoded = jwt.verify(token, secret);
        return decoded
    } catch (err) {
        // err
        return { email: null, role: "unauthorized" }
    }
}

module.exports = roleCheck