const express = require('express');
const { handler } = require('./index');
const app = express();
const port = 3000;

// Configure local mode
process.env.IS_LOCAL = "true";
process.env.ADMIN_KEY = "sahayatri123";

app.use(express.json());
app.use(require('cors')());

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Proxy all requests to the Lambda handler
app.use(async (req, res) => {
    const event = {
        httpMethod: req.method,
        path: req.path,
        headers: req.headers,
        body: JSON.stringify(req.body),
        queryStringParameters: req.query
    };

    try {
        const result = await handler(event);
        
        // Apply headers from Lambda response
        if (result.headers) {
            Object.keys(result.headers).forEach(key => {
                res.setHeader(key, result.headers[key]);
            });
        }

        res.status(result.statusCode || 200).send(result.body);
    } catch (err) {
        console.error("Local Server Error:", err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Sahayatri Local Backend running at http://localhost:${port}`);
    console.log(`IS_LOCAL: ${process.env.IS_LOCAL}`);
});
