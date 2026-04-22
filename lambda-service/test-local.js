// Script to run the lambda handler locally for testing
const lambda = require("./index");

// Configure local mode
process.env.IS_LOCAL = "true";
process.env.ADMIN_KEY = "sahayatri123";

async function runTest() {
    console.log("--- Testing GET /api/projects ---");
    const eventGet = {
        httpMethod: "GET",
        path: "/api/projects"
    };
    const resGet = await lambda.handler(eventGet);
    console.log("Status:", resGet.statusCode);
    console.log("Body:", resGet.body);

    console.log("\n--- Testing POST /api/quotes ---");
    const eventPost = {
        httpMethod: "POST",
        path: "/api/quotes",
        body: JSON.stringify({
            name: "Local Tester",
            email: "test@local.com",
            category: "Residential",
            message: "Testing local S3-style storage"
        })
    };
    const resPost = await lambda.handler(eventPost);
    console.log("Status:", resPost.statusCode);
    console.log("Response:", resPost.body);
    
    console.log("\n✅ Local test complete. Check the 'lambda-service/data/' folder for created files.");
}

runTest().catch(console.error);
