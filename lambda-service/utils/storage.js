const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const fs = require("fs").promises;
const path = require("path");
const { IS_LOCAL, BUCKET_NAME, AWS_REGION } = require("../config/constants");

const s3Client = !IS_LOCAL ? new S3Client({ region: AWS_REGION }) : null;

async function readData(resource, keyPrefix = "") {
    const filename = keyPrefix ? `${keyPrefix}${resource}.json` : `${resource}.json`;
    
    if (IS_LOCAL) {
        try {
            const filePath = path.join(__dirname, "..", "data", keyPrefix, `${resource}.json`);
            const content = await fs.readFile(filePath, "utf-8");
            return JSON.parse(content);
        } catch (err) {
            if (keyPrefix.startsWith("users/")) return null;
            return resource === "stats" ? {} : [];
        }
    } else {
        try {
            const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
            const response = await s3Client.send(command);
            const bodyContents = await response.Body.transformToString();
            return JSON.parse(bodyContents);
        } catch (err) {
            if (keyPrefix.startsWith("users/")) return null;
            return resource === "stats" ? {} : [];
        }
    }
}

async function writeData(resource, data, keyPrefix = "") {
    const filename = keyPrefix ? `${keyPrefix}${resource}.json` : `${resource}.json`;
    const content = JSON.stringify(data, null, 2);

    if (IS_LOCAL) {
        const dataDir = path.join(__dirname, "..", "data", keyPrefix);
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(path.join(dataDir, `${resource}.json`), content);
    } else {
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: content,
            ContentType: "application/json"
        });
        await s3Client.send(command);
    }
}

async function listFiles(prefix) {
    if (IS_LOCAL) {
        try {
            const dataDir = path.join(__dirname, "..", "data", prefix);
            const files = await fs.readdir(dataDir);
            return files.map(f => f.replace(".json", ""));
        } catch (err) {
            return [];
        }
    } else {
        try {
            const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME, Prefix: prefix });
            const response = await s3Client.send(command);
            return (response.Contents || []).map(item => item.Key.replace(prefix, "").replace(".json", ""));
        } catch (err) {
            return [];
        }
    }
}

module.exports = {
    readData,
    writeData,
    listFiles,
    s3Client
};
