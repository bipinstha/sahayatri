function createResponse(statusCode, body, headers = {}) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,X-Admin-Key,X-User-Id,Authorization",
            "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
            ...headers
        },
        body: typeof body === "string" ? body : JSON.stringify(body)
    };
}

module.exports = {
    createResponse
};
