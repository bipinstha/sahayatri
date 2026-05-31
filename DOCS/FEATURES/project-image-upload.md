# Feature Spec: Project Image Upload (with Compression/Zipping)

## Overview
Enable Admin users to upload project images directly from the dashboard. Images must be stored in a compressed/zipped format on S3 and rendered correctly on the frontend.

## Architectural Changes

### 1. Infrastructure (Terraform)
- **CORS:** Update Frontend S3 bucket CORS to allow `PUT` requests from the website origin.
- **IAM:** Add `s3:PutObject` permission to the Lambda execution role for the frontend bucket.

### 2. Backend (Lambda)
- **Endpoint:** `GET /api/auth/upload-url`
- **Query Params:** `filename`, `contentType`
- **Action:** Returns a Presigned URL valid for 5 minutes.

### 3. Frontend (Admin)
- **Upload Component:** Add file input to the Project Modal.
- **Compression/Zipping Logic:**
  - Option A (Literal): Use `JSZip` to archive the image before upload.
  - Option B (Recommended): Use Canvas to resize and compress to WebP/JPG.
- **Flow:** Get Presigned URL -> Zip/Compress -> PUT to S3 -> Save new path to Project JSON.

### 4. Frontend (Display)
- **Decoder:** Logic to detect `.zip` files, download, unzip in-memory, and create a Blob URL for the `<img>` tag.

## Risks
- **Performance:** Unzipping in JS adds CPU overhead.
- **Complexity:** Standard `<img>` tags won't work with `.zip` URLs directly; a wrapper function is required.
edit on  site add icone of whatsapp and number
