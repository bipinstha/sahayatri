module.exports = {
    PORT: process.env.PORT || 3000,
    IS_LOCAL: process.env.IS_LOCAL === "true",
    BUCKET_NAME: process.env.S3_BUCKET_NAME,
    FRONTEND_BUCKET_NAME: process.env.FRONTEND_BUCKET_NAME || `sahayatri-web-frontend-sahayatri-prod`,
    ADMIN_KEY: process.env.ADMIN_KEY || "sahayatri123",
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    AWS_REGION: process.env.AWS_REGION || "ap-south-1"
};
