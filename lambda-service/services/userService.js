const { readData, writeData } = require("../utils/storage");
const { hashPassword } = require("../utils/auth");

async function getAllUsers() {
    try {
        const data = await readData("index", "users/");
        return data || {};
    } catch (err) {
        return {};
    }
}

async function saveAllUsers(users) {
    await writeData("index", users, "users/");
}

async function getUserById(userId) {
    const users = await getAllUsers();
    return users[userId] || null;
}

async function createUser(userData) {
    const users = await getAllUsers();
    
    // Check for duplicate email
    const emailExists = Object.values(users).some(u => u.email === userData.email);
    if (emailExists) {
        throw new Error("User with this email already exists");
    }

    const password_hash = await hashPassword(userData.password);
    
    const newUser = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: userData.name || "User",
        password_hash: password_hash,
        role: userData.role || "viewer",
        status: userData.status || "active",
        created_at: new Date().toISOString()
    };
    
    users[newUser.id] = newUser;
    await saveAllUsers(users);
    
    const { password_hash: _, ...rest } = newUser;
    return rest;
}

async function updateUser(userId, userData) {
    const users = await getAllUsers();
    if (!users[userId]) throw new Error("User not found");
    
    // Check for duplicate email if email is being updated
    if (userData.email && userData.email !== users[userId].email) {
        const emailExists = Object.values(users).some(u => u.email === userData.email);
        if (emailExists) {
            throw new Error("User with this email already exists");
        }
    }

    const updates = { ...userData };
    if (updates.password) {
        updates.password_hash = await hashPassword(updates.password);
        delete updates.password;
    }
    
    users[userId] = { 
        ...users[userId], 
        ...updates, 
        updated_at: new Date().toISOString() 
    };
    
    await saveAllUsers(users);
    
    const { password_hash: _, ...rest } = users[userId];
    return rest;
}

async function deleteUser(userId) {
    const users = await getAllUsers();
    if (!users[userId]) throw new Error("User not found");
    
    delete users[userId];
    await saveAllUsers(users);
    return true;
}

module.exports = {
    getAllUsers,
    saveAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
