const { readData, writeData } = require("../utils/storage");

async function getResource(resource) {
    console.log(`[ContentService] Fetching resource: ${resource}`);
    return await readData(resource);
}

async function createItem(resource, itemData) {
    const data = await readData(resource);
    const newItem = { ...itemData, id: Date.now(), created_at: new Date().toISOString() };
    data.unshift(newItem);
    await writeData(resource, data);
    return newItem;
}

async function updateItem(resource, id, itemData) {
    let data = await readData(resource);
    const index = data.findIndex(item => item.id === parseInt(id) || item.id === id);
    if (index === -1) throw new Error("Item not found");
    
    data[index] = { ...data[index], ...itemData, updated_at: new Date().toISOString() };
    await writeData(resource, data);
    return data[index];
}

async function deleteItem(resource, id) {
    let data = await readData(resource);
    const initialLength = data.length;
    data = data.filter(item => item.id !== parseInt(id) && item.id !== id);
    
    if (data.length === initialLength) throw new Error("Item not found");
    
    await writeData(resource, data);
    return true;
}

async function updateStats(statsData) {
    await writeData("stats", statsData);
    return { message: "Stats updated" };
}

module.exports = {
    getResource,
    createItem,
    updateItem,
    deleteItem,
    updateStats
};
