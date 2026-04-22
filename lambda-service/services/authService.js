const bcrypt = require("bcryptjs");
const { generateToken, hashPassword } = require("../utils/auth");
const { getAllUsers, saveAllUsers } = require("./userService");
const { s3Client } = require("../utils/storage");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { FRONTEND_BUCKET_NAME } = require("../config/constants");

async function login(email, password) {
    const users = await getAllUsers();
    const user = Object.values(users).find(u => u.email === email);
    
    if (user && await bcrypt.compare(password, user.password_hash)) {
        const token = generateToken({ id: user.id, role: user.role });
        return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }
    throw new Error("Invalid credentials");
}

async function signup(userData) {
    const users = await getAllUsers();

    // Check for duplicate email
    const emailExists = Object.values(users).some(u => u.email === userData.email);
    if (emailExists) {
        throw new Error("User with this email already exists");
    }

    const adminExists = Object.values(users).some(u => u.role === "admin");
    const role = adminExists ? "viewer" : "admin";
    
    const password_hash = await hashPassword(userData.password);
    const newUser = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: userData.name || "User",
        password_hash: password_hash,
        role: role,
        status: "active",
        created_at: new Date().toISOString()
    };
    
    users[newUser.id] = newUser;
    await saveAllUsers(users);
    
    const token = generateToken({ id: newUser.id, role: newUser.role });
    return { token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } };
}

async function getUploadUrl(filename, contentType) {
    const key = `uploads/${Date.now()}-${filename}`;
    
    const command = new PutObjectCommand({
        Bucket: FRONTEND_BUCKET_NAME,
        Key: key,
        ContentType: contentType || "application/octet-stream"
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    return { uploadUrl, key };
}

async function checkStatus() {
    const users = await getAllUsers();
    const adminExists = Object.values(users).some(u => u.role === "admin");
    return { adminExists, bootstrapRequired: !adminExists };
}

module.exports = {
    login,
    signup,
    getUploadUrl,
    checkStatus
};
