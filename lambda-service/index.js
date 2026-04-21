const { ADMIN_KEY, IS_LOCAL, PORT } = require("./config/constants");
const { verifyToken } = require("./utils/auth");
const { createResponse } = require("./utils/response");
const { readData } = require("./utils/storage");

const authService = require("./services/authService");
const userService = require("./services/userService");
const contentService = require("./services/contentService");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const handler = async (event) => {
    const httpMethod = event.httpMethod || "GET";
    const requestPath = event.path || "/";
    const body = event.body ? (typeof event.body === "string" ? JSON.parse(event.body) : event.body) : null;
    const headers = event.headers || {};
    
    const adminKeyHeader = headers["x-admin-key"] || headers["X-Admin-Key"];
    const authHeader = headers["authorization"] || headers["Authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    let isAdmin = adminKeyHeader === ADMIN_KEY;
    let requester = { role: 'guest' };
    let tokenProvided = !!token;

    if (tokenProvided) {
        try {
            requester = verifyToken(token);
            if (requester.role === 'admin') isAdmin = true;
        } catch (e) {
            console.warn("[Auth] Invalid token provided:", e.message);
            return createResponse(403, { error: "Invalid or expired token" });
        }
    }

    const segments = requestPath.split("/").filter(Boolean);
    const isApi = segments[0] === "api";
    const resource = isApi ? segments[1] : segments[0];
    
    console.log(`[Modular] Method: ${httpMethod}, Path: ${requestPath}, Resource: ${resource}`);

    if (httpMethod === "OPTIONS") return createResponse(200, { message: "OK" });

    try {
        // --- Auth Endpoints ---
        if (resource === "auth") {
            const action = segments[2];
            if (action === "status") return createResponse(200, await authService.checkStatus());
            if (action === "signup") return createResponse(200, await authService.signup(body));
            if (action === "login") return createResponse(200, await authService.login(body.email, body.password));
            if (action === "verify" && httpMethod === "POST") return createResponse(200, { valid: true, user: requester });
            if (action === "upload-url") {
                const { filename, contentType } = event.queryStringParameters || {};
                return createResponse(200, await authService.getUploadUrl(filename, contentType));
            }
        }

        // --- User CRUD Endpoints ---
        if (resource === "users") {
            const userId = segments[2];

            // GET: Allow all authenticated users to view users
            if (httpMethod === "GET" && !userId) {
                if (!tokenProvided) {
                    return createResponse(401, { error: "Unauthorized: Login required to view users" });
                }
                const allUsers = Object.values(await userService.getAllUsers()).map(({password_hash, ...u}) => u);
                return createResponse(200, { users: allUsers });
            }

            // POST, PUT, DELETE: Only Admin can modify users
            if (!isAdmin) {
                return createResponse(403, { error: `Forbidden: Only Admins can modify users. Your role: ${requester.role}` });
            }
            
            if (httpMethod === "POST") return createResponse(201, await userService.createUser(body));
            if (httpMethod === "PUT" && userId) return createResponse(200, await userService.updateUser(userId, body));
            if (httpMethod === "DELETE" && userId) return createResponse(200, { success: await userService.deleteUser(userId) });
        }

        // --- Content Endpoints ---
        const contentResources = ["projects", "services", "testimonials", "quotes", "stats"];
        if (contentResources.includes(resource)) {
            if (httpMethod === "GET") {
                // All endpoints allow GET for authenticated users (except special cases)
                return createResponse(200, await contentService.getResource(resource));
            }
            if (httpMethod === "POST") {
                // Quotes: Public endpoint (with captcha)
                if (resource === "quotes") {
                    const { captcha_answer, captcha_id, ...quoteData } = body || {};
                    
                    // Simple Captcha Validation
                    if (!captcha_id || !captcha_answer) {
                        return createResponse(400, { error: "Captcha is required" });
                    }
                    
                    try {
                        const expected = Buffer.from(captcha_id, 'base64').toString();
                        if (parseInt(expected) !== parseInt(captcha_answer)) {
                            return createResponse(400, { error: "Invalid Captcha answer" });
                        }
                    } catch (e) {
                        return createResponse(400, { error: "Invalid Captcha format" });
                    }

                    return createResponse(201, await contentService.createItem(resource, quoteData));
                }
                
                if (!isAdmin) return createResponse(403, { error: "Forbidden: Admin access required" });
                return createResponse(201, await contentService.createItem(resource, body));
            }
            if (httpMethod === "PUT") {
                // Quotes: Manager+ only
                if (resource === "quotes") {
                    const canEditQuotes = requester.role === 'admin' || requester.role === 'manager';
                    if (!canEditQuotes && !isAdmin) {
                        return createResponse(403, { error: `Forbidden: Only Managers and Admins can edit quotes` });
                    }
                    return createResponse(200, await contentService.updateItem(resource, segments[2], body));
                }
                if (!isAdmin) return createResponse(403, { error: "Forbidden: Admin access required" });
                if (resource === "stats") return createResponse(200, await contentService.updateStats(body));
                return createResponse(200, await contentService.updateItem(resource, segments[2], body));
            }
            if (httpMethod === "DELETE") {
                // Quotes: Manager+ only
                if (resource === "quotes") {
                    const canDeleteQuotes = requester.role === 'admin' || requester.role === 'manager';
                    if (!canDeleteQuotes && !isAdmin) {
                        return createResponse(403, { error: `Forbidden: Only Managers and Admins can delete quotes` });
                    }
                    const id = segments[2] || (body ? body.id : null);
                    return createResponse(200, { success: await contentService.deleteItem(resource, id) });
                }
                if (!isAdmin) return createResponse(403, { error: "Forbidden: Admin access required" });
                const id = segments[2] || (body ? body.id : null);
                return createResponse(200, { success: await contentService.deleteItem(resource, id) });
            }
        }

        return createResponse(404, { error: "Not Found" });

    } catch (err) {
        console.error("[Handler Error]:", err);
        
        let statusCode = 500;
        if (err.message === "Invalid credentials") statusCode = 401;
        if (err.message.includes("Already exists") || err.message.includes("already exists")) statusCode = 409;
        if (err.message === "Forbidden" || err.message.includes("Forbidden")) statusCode = 403;
        if (err.message === "Item not found" || err.message === "User not found") statusCode = 404;
        
        return createResponse(statusCode, { error: err.message });
    }
};

// Express wrapper for local testing
if (IS_LOCAL) {
    app.use(async (req, res) => {
        const event = {
            httpMethod: req.method,
            path: req.path,
            headers: req.headers,
            body: req.body,
            queryStringParameters: req.query
        };
        const result = await handler(event);
        res.status(result.statusCode).set(result.headers).send(result.body);
    });

    app.listen(PORT, () => {
        console.log(`🚀 Modular Sahayatri Backend running at http://localhost:${PORT}`);
    });
}

exports.handler = handler;
