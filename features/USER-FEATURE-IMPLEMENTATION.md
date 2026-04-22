# User Management Feature Implementation Guide

## Overview
This document provides a comprehensive guide for the **User Management Feature** that has been implemented in both the traditional API (PostgreSQL) and serverless (S3) approaches.

## What Has Been Created

### 1. Feature Documentation
**File:** `features/USER-FEATURE.MD`
- Complete feature specification with user stories
- Full API endpoint documentation for both implementations
- Data model explanations for PostgreSQL and S3/JSON storage
- Security considerations and best practices
- Implementation phases and testing checklist
- Architecture comparison between database and serverless approaches

### 2. Backend/API (PostgreSQL)
**Location:** `backend/api/`

#### Files Modified:
- `schema.sql` - Added users table with full schema
- `index.js` - Added 6 user management endpoints with bcrypt password hashing
- `package.json` - Added bcryptjs dependency

#### User Management Endpoints:
- `GET /api/users` - List users (pagination, filtering, search)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user (with validation)
- `PUT /api/users/:id` - Update user (email, name, password, role, status)
- `DELETE /api/users/:id` - Soft delete user (deactivate)
- `POST /api/users/:id/restore` - Restore deleted user

#### Features:
- Email validation and uniqueness checking
- Password strength validation (8+ chars, mixed case, numbers)
- Role-based access control (admin, manager, editor, viewer, guest)
- User status management (active, inactive, suspended)
- Proper error handling and validation
- Bcrypt password hashing (10 rounds)

### 3. Lambda-Service (S3/Serverless)
**Location:** `lambda-service/`

#### Files Modified:
- `index.js` - Added 6 user management endpoints (same as API)
- `package.json` - Added bcryptjs dependency
- Created `data/users/index.json` - Sample user storage structure

#### User Management Endpoints:
Same as backend/api:
- `GET /users` - List users (pagination, filtering, search)
- `GET /users/:id` - Get single user
- `POST /users` - Create new user (with validation)
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Soft delete user
- `POST /users/:id/restore` - Restore deleted user

#### Storage:
- **Production:** AWS S3 (users/index.json bucket)
- **Development:** Local JSON files (data/users/index.json)
- All users stored in a single indexed JSON file for fast access
- Password hashing with bcryptjs

### 4. Frontend UI
**Location:** `ui/admin.html` and `ui/js/admin.js`

#### New Features:
- **Users Tab** in admin dashboard
- Users table with columns: ID, Email, Name, Role, Status, Last Login
- Search functionality (by email or name)
- Filter by role (admin, manager, editor, viewer, guest)
- Filter by status (active, inactive, suspended)
- Create new user button with modal form
- Edit user functionality
- Delete user functionality with soft delete
- Role and status color-coded badges

#### User Create/Edit Modal:
- Email input with validation
- Name input
- Password input (with strength indicator)
- Role selector dropdown
- Status selector dropdown
- Form validation on submit
- Error messages for validation failures

## Setup Instructions

### For Backend/API (PostgreSQL)

1. **Install dependencies:**
   ```bash
   cd backend/api
   npm install
   ```

2. **Initialize database:**
   ```bash
   # Create database if not exists
   psql -U your_user -c "CREATE DATABASE sahayatri;"
   
   # Run schema
   psql -U your_user -d sahayatri -f schema.sql
   ```

3. **Verify default admin user:**
   - Email: `admin@sahayatri.com`
   - Password: `Admin@123` (hashed)
   - Role: admin
   - Status: active

4. **Start server:**
   ```bash
   ADMIN_KEY=your_secure_key PORT=3000 node index.js
   ```

### For Lambda-Service (S3)

1. **Install dependencies:**
   ```bash
   cd lambda-service
   npm install
   ```

2. **Local development:**
   ```bash
   IS_LOCAL=true ADMIN_KEY=sahayatri123 node server-local.js
   # Access on http://localhost:3001
   ```

3. **AWS deployment:**
   - Create S3 bucket with structure: `s3://bucket-name/users/index.json`
   - Package code and dependencies
   - Upload as Lambda function
   - Configure API Gateway trigger
   - Set environment variables:
     ```
     AWS_REGION=ap-south-1
     S3_BUCKET_NAME=your-bucket
     IS_LOCAL=false
     ADMIN_KEY=your_secure_key
     ```

### Frontend Setup

The frontend already includes the new Users tab and functionality. Update the API endpoint if needed:

**In `ui/js/admin.js`:**
```javascript
// For local development with backend/api
const API_URL = 'http://localhost:3000';

// For production AWS Lambda
const API_URL = 'https://your-api-gateway-url.execute-api.region.amazonaws.com';
```

## Testing the Feature

### Test Data Structure

**User object format:**
```json
{
  "id": "user_1234567890",
  "email": "user@sahayatri.com",
  "name": "John Doe",
  "password_hash": "$2b$10$...",
  "role": "editor",
  "status": "active",
  "created_at": "2026-04-15T10:30:00Z",
  "updated_at": "2026-04-15T10:30:00Z"
}
```

### Sample API Requests

**1. List all users (pagination):**
```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=10" \
  -H "X-Admin-Key: sahayatri123"
```

**2. Create new user:**
```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: sahayatri123" \
  -d '{
    "email": "newuser@sahayatri.com",
    "name": "New User",
    "password": "SecurePass123",
    "role": "editor",
    "status": "active"
  }'
```

**3. Update user:**
```bash
curl -X PUT "http://localhost:3000/api/users/user_1234567890" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Key: sahayatri123" \
  -d '{
    "role": "manager",
    "status": "active"
  }'
```

**4. Delete user:**
```bash
curl -X DELETE "http://localhost:3000/api/users/user_1234567890" \
  -H "X-Admin-Key: sahayatri123"
```

**5. Restore user:**
```bash
curl -X POST "http://localhost:3000/api/users/user_1234567890/restore" \
  -H "X-Admin-Key: sahayatri123"
```

## Security Notes

1. **Password Hashing:**
   - Uses bcryptjs with 10 rounds
   - High security standard for password storage

2. **Admin Key:**
   - All user management endpoints require X-Admin-Key header
   - Should be strong and kept secret in production

3. **Email Validation:**
   - Prevents duplicate email addresses
   - Standard email format validation

4. **Password Requirements:**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number

5. **Soft Delete:**
   - Default delete operation deactivates user (sets status to inactive)
   - Hard delete available via `?hard=true` query parameter
   - Restore functionality available for soft-deleted users

## Implementation Comparison

| Feature | Database | Serverless |
|---------|----------|-----------|
| **Storage** | PostgreSQL | S3 |
| **Scalability** | Vertical | Horizontal |
| **Cost** | Fixed | Pay-per-request |
| **Complexity** | Moderate | Simple |
| **Speed** | Very Fast | Fast |
| **Durability** | Excellent | Excellent |
| **Best For** | High-frequency | Sporadic access |

## Next Steps

1. **Password Reset Feature**
   - Implement email-based password reset
   - Create secure token-based reset flow

2. **Two-Factor Authentication**
   - Add TOTP/SMS-based 2FA
   - Store 2FA secrets securely

3. **Audit Logging**
   - Log all user management actions
   - Track changes by user and timestamp

4. **Bulk User Import**
   - CSV upload functionality
   - Batch create users with validation

5. **User Activity Tracking**
   - Track last login timestamps
   - Log user actions and access

## Support & Documentation

For detailed API documentation, see: `features/USER-FEATURE.MD`

For more information:
- Backend/API docs: Check `backend/api/index.js`
- Lambda-Service docs: Check `lambda-service/index.js`
- UI implementation: Check `ui/js/admin.js`
