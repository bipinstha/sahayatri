# USER FEATURE - Role-Based User Management

## Overview
The User Management feature enables administrators to perform complete CRUD (Create, Read, Update, Delete) operations on system users with role-based access control through the admin dashboard.

**Available in two implementations:**
- **backend/api** - PostgreSQL database storage
- **lambda-service** - AWS S3 JSON-based storage (serverless)

## Feature ID
`USER-FEATURE` v1.0

## User Stories

### US-001: View All Users
**As an** Admin  
**I want to** see a list of all users in the system  
**So that** I can manage user accounts effectively

**Acceptance Criteria:**
- Users are displayed in a table with pagination
- Show user ID, email, name, role, status, and last login
- Table is sortable by any column
- Search functionality available

### US-002: Create New User
**As an** Admin  
**I want to** create new user accounts  
**So that** new team members can access the system

**Acceptance Criteria:**
- Form with fields: email, name, password, role, status
- Validate email uniqueness
- Password strength validation (min 8 chars, mixed case, numbers)
- Auto-generate temporary password option
- Send email notification (future enhancement)

### US-003: Edit User Details
**As an** Admin  
**I want to** update user information and role assignments  
**So that** I can maintain accurate user records and permissions

**Acceptance Criteria:**
- Edit modal/form for user details
- Update email, name, role, status
- Change password option
- Audit log entry on update
- Show last modified timestamp

### US-004: Delete User
**As an** Admin  
**I want to** deactivate or remove users from the system  
**So that** I can manage access control

**Acceptance Criteria:**
- Soft delete (deactivate) by default
- Hard delete with admin confirmation
- Confirm before deletion with warning
- Log deletion with reason

### US-005: Role Management
**As an** Admin  
**I want to** assign different roles to users  
**So that** I can control access permissions

**Roles:**
- `admin` - Full system access, can manage users, projects, services
- `manager` - Can create/edit projects and services, view users
- `editor` - Can edit content (projects, testimonials, services)
- `viewer` - Read-only access to all content
- `guest` - Limited guest access

## Data Model

### Database Implementation (backend/api - PostgreSQL)
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer' CHECK(role IN ('admin', 'manager', 'editor', 'viewer', 'guest')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'suspended')),
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id),
    updated_by INT REFERENCES users(id)
);

-- Index for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

### S3 Implementation (lambda-service - JSON Storage)

**Storage Structure:**
```
S3 Bucket/users/
├── index.json (main user index with all users)
```

**User Object Schema:**
```json
{
  "id": "user_1234567890",
  "email": "user@sahayatri.com",
  "name": "User Name",
  "password_hash": "$2b$10$...",
  "role": "editor",
  "status": "active",
  "created_at": "2026-04-15T10:30:00Z",
  "updated_at": "2026-04-15T10:30:00Z"
}
```

**Local Development:**
Uses JSON files in `lambda-service/data/users/index.json`

## API Endpoints

### Implementation Endpoints

#### backend/api (PostgreSQL)
- **Base URL:** `http://localhost:3000/api/users` (local)
- **Production:** AWS API Gateway endpoint
- **Storage:** PostgreSQL database
- **Response Format:** JSON with consistent structure
- **Authentication:** Header `X-Admin-Key`

#### lambda-service (S3/Serverless)
- **Base URL:** `https://2ytrivx9bl.execute-api.ap-south-1.amazonaws.com/users` (production)
- **Local URL:** `http://localhost:3001/users` (when IS_LOCAL=true)
- **Storage:** AWS S3 (`users/index.json`)
- **Local Dev Storage:** JSON files (`data/users/index.json`)
- **Response Format:** JSON with consistent structure
- **Authentication:** Header `X-Admin-Key`

### API Endpoint Reference

#### Base URL: `/users` or `/api/users`

#### 1. GET /api/users
**Description:** Fetch all users (paginated)  
**Authentication:** Admin Key Required  
**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Records per page
- `role` - Filter by role
- `status` - Filter by status
- `search` - Search by email or name

**Response:**
```json
{
  "total": 50,
  "page": 1,
  "limit": 10,
  "users": [
    {
      "id": 1,
      "email": "admin@sahayatri.com",
      "name": "System Admin",
      "role": "admin",
      "status": "active",
      "last_login": "2026-04-15T10:30:00Z",
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

#### 2. GET /api/users/:id
**Description:** Fetch a single user by ID  
**Authentication:** Admin Key Required  
**Response:** Single user object

#### 3. POST /api/users
**Description:** Create a new user  
**Authentication:** Admin Key Required  
**Request Body:**
```json
{
  "email": "user@sahayatri.com",
  "name": "User Name",
  "password": "SecurePass123",
  "role": "editor",
  "status": "active"
}
```

**Validation Rules:**
- Email must be unique and valid format
- Password: min 8 chars, 1 uppercase, 1 lowercase, 1 number
- Role must be one of: admin, manager, editor, viewer, guest
- Status must be one of: active, inactive, suspended

**Response:** Created user object (password excluded)

#### 4. PUT /api/users/:id
**Description:** Update user information  
**Authentication:** Admin Key Required  
**Request Body:** (Any combination of updatable fields)
```json
{
  "name": "Updated Name",
  "email": "newemail@sahayatri.com",
  "role": "manager",
  "status": "inactive",
  "password": "NewPassword123"
}
```

**Response:** Updated user object

#### 5. DELETE /api/users/:id
**Description:** Delete user (soft delete by default)  
**Authentication:** Admin Key Required  
**Query Parameters:**
- `hard` (boolean) - Perform hard delete if true

**Response:**
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

#### 6. POST /api/users/:id/restore
**Description:** Restore softly deleted user  
**Authentication:** Admin Key Required  
**Response:** Restored user object

## Implementation Guides

### Setup backend/api (PostgreSQL)

1. **Install dependencies:**
   ```bash
   cd backend/api
   npm install bcryptjs
   ```

2. **Initialize database:**
   ```bash
   psql -d your_database -f schema.sql
   ```

3. **Configure environment:**
   ```bash
   ADMIN_KEY=your_secure_key
   PORT=3000
   ```

4. **Start server:**
   ```bash
   node index.js
   ```

### Setup lambda-service (S3)

1. **Install dependencies:**
   ```bash
   cd lambda-service
   npm install bcryptjs @aws-sdk/client-s3
   ```

2. **Configure environment:**
   ```bash
   # For local development
   IS_LOCAL=true
   ADMIN_KEY=sahayatri123
   
   # For AWS deployment
   AWS_REGION=ap-south-1
   S3_BUCKET_NAME=your-bucket-name
   ADMIN_KEY=your_secure_key
   ```

3. **Create S3 bucket structure:**
   ```bash
   # Or manually create: s3://your-bucket/users/index.json
   ```

4. **Start locally:**
   ```bash
   node server-local.js
   # Server runs on http://localhost:3001
   ```

5. **Deploy to AWS Lambda:**
   - Package code and dependencies
   - Upload handler as Lambda function
   - Set environment variables in Lambda console
   - Configure API Gateway trigger
   - Set S3 bucket permissions for Lambda role

## Frontend Components

### Admin Panel - Users Tab
Location: `ui/admin.html` - New "Users" tab

**Features:**
- Users table with sorting and filtering
- Search bar for name/email
- Add User button → Create modal
- Edit button per row → Edit modal
- Delete button per row → Confirmation dialog
- Status badge (Active/Inactive/Suspended)
- Role badge with color coding
- Last login timestamp

### User Create/Edit Modal
- Form validation before submission
- Password strength indicator
- Role selector dropdown
- Status selector
- Submit and Cancel buttons

## Security Considerations

1. **Authentication:** Requires admin key in header (`X-Admin-Key`)
2. **Password Storage:** Must hash with bcrypt (min 10 rounds)
3. **Password Reset:** Implement secure token-based reset flow
4. **Audit Logging:** Log all user management actions
5. **Email Validation:** Verify before allowing duplicate emails
6. **Rate Limiting:** Limit API calls to prevent brute force

## Implementation Phases

### Phase 1 (MVP)
- [x] Database schema creation
- [x] API endpoints (CRUD)
- [ ] Admin UI - Users table
- [ ] Admin UI - Create/Edit modals
- [ ] Frontend validation

### Phase 2 (Enhancement)
- [ ] Advanced filtering and search
- [ ] Bulk user import (CSV)
- [ ] Password reset email
- [ ] Two-factor authentication
- [ ] User activity audit log

### Phase 3 (Optimization)
- [ ] User permission granularity
- [ ] Role templates
- [ ] User groups
- [ ] API key management for users

## Testing Checklist

- [ ] Create user with valid data
- [ ] Reject duplicate email
- [ ] Reject weak password
- [ ] Update user details
- [ ] Soft delete user
- [ ] Restore deleted user
- [ ] Filter users by role
- [ ] Filter users by status
- [ ] Search by email/name
- [ ] Verify admin key validation
- [ ] Test pagination

## Dependencies

### backend/api (PostgreSQL)
- Express.js v5.2.1
- PostgreSQL 18+
- bcryptjs v2.4.3 (password hashing)
- cors v2.8.6
- dotenv v17.4.1
- pg v8.20.0 (PostgreSQL driver)
- Node.js 18+

### lambda-service (S3/Serverless)
- Express.js v5.2.1
- AWS SDK v3 (@aws-sdk/client-s3)
- bcryptjs v2.4.3 (password hashing)
- cors v2.8.6
- Node.js 18+ / AWS Lambda Runtime

### Frontend
- Tailwind CSS (styling)
- Vanilla JavaScript (no dependencies)
- HTML5 Forms with validation

## Architecture Comparison

| Aspect | backend/api | lambda-service |
|--------|-------------|----------------|
| **Storage** | PostgreSQL | S3 + JSON |
| **Scalability** | Vertical | Horizontal (Serverless) |
| **Cost** | Fixed (DB Instance) | Pay-per-request |
| **Latency** | Direct DB access | S3 HTTP requests |
| **Ideal For** | High-frequency ops | Sporadic requests |
| **Local Dev** | Docker/Native DB | JSON files |
| **Deployment** | EC2/RDS | Lambda/S3 |

## Status
**Current:** Feature Definition + Implementation  
**Implementations:** 
- ✅ backend/api (PostgreSQL) - COMPLETE
- ✅ lambda-service (S3/JSON) - COMPLETE
- ✅ Frontend UI - COMPLETE
**Last Updated:** 2026-04-15  
**Owner:** Development Team
