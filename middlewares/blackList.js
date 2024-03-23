const jwt = require('jsonwebtoken');

let tokenBlacklist = [];
const checkBlacklist=(req, res, next)=> {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token revoked. Please log in again' });
    }

    // Token is valid
    next();
};
module.exports = tokenBlacklist;