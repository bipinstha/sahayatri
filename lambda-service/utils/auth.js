const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Min 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

function isValidRole(role) {
    const validRoles = ['admin', 'manager', 'editor', 'viewer', 'guest'];
    return validRoles.includes(role);
}

function isValidStatus(status) {
    const validStatuses = ['active', 'inactive', 'suspended'];
    return validStatuses.includes(status);
}

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    validateEmail,
    validatePassword,
    hashPassword,
    isValidRole,
    isValidStatus,
    generateToken,
    verifyToken
};
