# Sahayatri User Roles & Permissions

This document outlines the permissions and capabilities for each user role in the Sahayatri system.

---

## 📋 User Roles Overview

| Role | Level | Use Case |
|------|-------|----------|
| **Guest** | Public | Not logged in, browsing public website |
| **Viewer** | Read-Only | Can view all data, no modifications |
| **Editor** | Content Manager | Can create and edit content (projects, services, testimonials) |
| **Manager** | Team Lead | Can manage content and users |
| **Admin** | System Admin | Full system access and control |

---

## 🔐 Detailed Permission Matrix

### Public Website Access (No Login Required)

| Feature | Guest |
|---------|-------|
| View homepage | ✅ |
| View projects portfolio | ✅ |
| View services | ✅ |
| View testimonials | ✅ |
| View company statistics | ✅ |
| Use budget estimator | ✅ |
| Submit quote request | ✅ |
| Access admin dashboard | ❌ |

---

### Admin Dashboard - User Management

| Action                    | Viewer | Editor | Manager | Admin |
|---------------------------|--------|--------|---------|-------|
| **View users list**       |   ✅   |    ✅   |   ✅    |   ✅  |
| **View user details**     |   ✅   |    ✅   |   ✅    |   ✅  |
| **Create user**           |   ❌   |    ❌   |   ❌    |   ✅  |
| **Edit user**             |   ❌   |    ❌   |   ❌    |   ✅  |
| **Delete user**           |   ❌   |    ❌   |   ❌    |   ✅  |
| **Manage user roles**     |   ❌   |    ❌   |   ❌    |   ✅  |
| **View user audit log**   |   ❌   |    ❌   |   ❌    |   ✅  |

---

### Admin Dashboard - Content Management

#### Projects

| Action             | Viewer | Editor | Manager | Admin |
|--------------------|--------|--------|---------|-------|
| **View projects**  |   ✅   |   ✅   |   ✅    |   ✅  |
| **Create project** |   ❌   |   ✅   |   ✅    |   ✅  |
| **Edit project**   |   ❌   |   ✅   |   ✅    |   ✅  |
| **Delete project** |   ❌   |   ✅   |   ✅    |   ✅  |
| **Publish project**|   ❌   |   ✅   |   ✅    |   ✅  |

#### Services

| Action             | Viewer | Editor | Manager | Admin |
|--------------------|--------|--------|---------|-------|
| **View services**  |   ✅   |   ✅   |   ✅    |   ✅  |
| **Create service** |   ❌   |   ✅   |   ✅    |   ✅  |
| **Edit service**   |   ❌   |   ✅   |   ✅    |   ✅  |
| **Delete service** |   ❌   |   ✅   |   ✅    |   ✅  |

#### Testimonials

| Action                  | Viewer | Editor | Manager | Admin |
|-------------------------|--------|--------|---------|-------|
| **View testimonials**   |   ✅   |   ✅   |   ✅    |   ✅  |
| **Create testimonial**  |   ❌   |   ✅   |   ✅    |   ✅  |
| **Edit testimonial**    |   ❌   |   ✅   |   ✅    |   ✅  |
| **Delete testimonial**  |   ❌   |   ✅   |   ✅    |   ✅  |
| **Approve testimonial** |   ❌   |   ❌   |   ✅    |   ✅  |

#### Quotes & Inquiries

| Action             | Viewer | Editor | Manager | Admin |
|--------------------|--------|--------|---------|-------|
| **View quotes**    |   ✅   |   ✅   |   ✅    |   ✅  |
| **Create quote**   |   ❌   |   ❌   |   ✅    |   ✅  |
| **Edit quote**     |   ❌   |   ❌   |   ✅    |   ✅  |
| **Delete quote**   |   ❌   |   ❌   |   ✅    |   ✅  |
| **Export quotes**  |   ❌   |   ❌   |   ✅    |   ✅  |

#### Statistics & Settings

| Action                | Viewer | Editor | Manager | Admin |
|-----------------------|--------|--------|---------|-------|
| **View statistics**   |   ✅   |   ✅   |   ✅    |   ✅  |
| **Edit statistics**   |   ❌   |   ❌   |   ❌    |   ✅  |
| **Access settings**   |   ❌   |   ❌   |   ❌    |   ✅  |
| **Manage API keys**   |   ❌   |   ❌   |   ❌    |   ✅  |
| **View system logs**  |   ❌   |   ❌   |   ❌    |   ✅  |

---

## 📝 Role Descriptions

### 🔍 Viewer
**Best for:** Quality assurance team, supervisors who need to monitor but not modify

- **Can do:**
  - View all users in the system
  - View all projects, services, testimonials, statistics
  - Read-only access to all content
  - Monitor data but cannot make changes

- **Cannot do:**
  - Create, edit, or delete any content
  - Manage users
  - Access system settings
  - Change configurations

- **API Access:** `GET /api/*` endpoints only

---

### ✏️ Editor
**Best for:** Content creators, designers, copywriters

- **Can do:**
  - Create and manage projects
  - Create and manage services
  - Create and manage testimonials
  - Upload images and media
  - View all content in system
  - View user list (read-only)

- **Cannot do:**
  - Manage users (create, edit, delete)
  - View or manage quotes
  - Manage other editors' work
  - Access system settings

- **API Access:**
  - `GET /api/*` - All read operations
  - `POST /api/projects`, `/api/services`, `/api/testimonials`
  - `PUT /api/projects/:id`, `/api/services/:id`, `/api/testimonials/:id`
  - `DELETE /api/projects/:id`, `/api/services/:id`, `/api/testimonials/:id`

---

### 👔 Manager
**Best for:** Team leads, project managers, business analysts

- **Can do:**
  - All Editor capabilities
  - View and manage quote requests
  - Approve testimonials
  - Generate reports
  - Monitor system usage
  - View all users (read-only)

- **Cannot do:**
  - Create, edit, delete users (admin-only)
  - Change admin settings
  - Manage API keys
  - Access system logs
  - Change database settings

- **API Access:**
  - All Editor access
  - `GET /api/users` - View all users (read-only)
  - `GET /api/quotes` - View quote requests

---

### 👑 Admin
**Best for:** System administrators, business owners, technical leads

- **Can do:**
  - Full system access
  - All Manager capabilities
  - Manage all user roles and permissions
  - Access system settings
  - Manage API keys and integrations
  - View and export system logs
  - Configure database and storage
  - Manage backups and security
  - View audit trails

- **Cannot do:**
  - None (full access)

- **API Access:**
  - All endpoints (`GET`, `POST`, `PUT`, `DELETE`)
  - Access to admin-only endpoints
  - No restrictions

---

## 🔑 Authentication & Access Control

### Login Requirements
- **Viewer, Editor, Manager, Admin**: Must login with email and password
- **Guest**: Public access, no login required

### Token Expiration
- All JWT tokens expire after **24 hours**
- Users must re-login after expiration

### Session Management
- Authentication token stored in `localStorage`
- User info stored in `localStorage` for role-based UI
- Auto-logout on token expiration (in development)

---

## 📊 Signup & First User

### First User Registration
- **1st user to signup** → Automatically assigned **Admin** role
- **Subsequent signups** → Assigned **Viewer** role by default
- **Role change** → Only admins can change user roles after signup

### Account Status
- **Active**: User can login and access features
- **Inactive**: User exists but cannot login
- **Suspended**: User account locked (admin action)

---

## 🛡️ Security Features

### Password Requirements
- Minimum **8 characters**
- At least **1 uppercase** letter
- At least **1 lowercase** letter
- At least **1 number**
- Passwords are hashed using **bcryptjs** (salt rounds: 10)

### API Security
- All API calls require valid JWT token (except public endpoints)
- Admin-key header for automated systems (`X-Admin-Key`)
- CORS enabled for frontend origin only
- Rate limiting via AWS API Gateway

### Audit Trail
- User actions logged (create, edit, delete)
- Login attempts tracked
- Admin actions logged for compliance

---

## 🔄 Workflow Examples

### Example 1: Content Creation Workflow
1. **Editor** creates new project
2. **Manager** reviews and approves
3. **Admin** publishes to live site
4. **Viewer** monitors from read-only dashboard

### Example 2: User Management Workflow
1. **Admin** creates new user account with viewer/editor/manager role
2. **User** logs in and sees only features available to their role
3. **Admin** can edit user role or deactivate accounts
4. **All users** (except guest) can view the user list in admin dashboard

### Example 3: Quote Request Workflow
1. **Guest** submits quote request from public website
2. **Manager** or **Admin** views quote in dashboard
3. **Manager** sends follow-up email to client
4. **Admin** exports quotes for reporting

---

## 📱 API Endpoints & Permission Checks

### Users Endpoint
```
GET    /api/users              → All authenticated users (Viewer+)
POST   /api/users              → Admin only
PUT    /api/users/:id          → Admin only
DELETE /api/users/:id          → Admin only
```

### Content Endpoints
```
GET    /api/projects           → All authenticated users (Viewer+)
POST   /api/projects           → Admin only
PUT    /api/projects/:id       → Admin only
DELETE /api/projects/:id       → Admin only

GET    /api/services           → All authenticated users (Viewer+)
POST   /api/services           → Admin only
PUT    /api/services/:id       → Admin only
DELETE /api/services/:id       → Admin only

GET    /api/testimonials       → All authenticated users (Viewer+)
POST   /api/testimonials       → Admin only
PUT    /api/testimonials/:id   → Admin only
DELETE /api/testimonials/:id   → Admin only

GET    /api/quotes             → All authenticated users (Viewer+)
POST   /api/quotes             → Manager+ only
PUT    /api/quotes/:id         → Manager+ only
DELETE /api/quotes/:id         → Manager+ only
```

### Auth Endpoints
```
POST   /api/auth/signup        → Public
POST   /api/auth/login         → Public
POST   /api/auth/verify        → Authenticated
GET    /api/auth/status        → Authenticated
POST   /api/auth/upload-url    → Admin+ (S3 uploads)
```

---

## 🚀 Implementation Notes

### Current Implementation Status
- ✅ Admin role fully implemented (add, edit, delete users and content)
- ✅ Viewer role implemented (read-only access)
- ⏳ Editor role implemented (content creation)
- ⏳ Manager role implemented (quote and testimonial approval, read-only user viewing)
- ✅ Role-based UI updates in admin dashboard
- ✅ All authenticated users can view user list (read-only)

### Upcoming Enhancements
- [ ] Granular permission control per user
- [ ] Custom roles creation
- [ ] Permission inheritance models
- [ ] Activity logging and audit trails
- [ ] Two-factor authentication (2FA)
- [ ] Role-based API rate limiting
- [ ] Permission-based feature flags

---

## ❓ FAQ

**Q: Can a Viewer user promote themselves to Admin?**
A: No. Only admins can change user roles.

**Q: What happens to data if a user is deleted?**
A: User is deactivated, not deleted. All their content remains intact.

**Q: Can an Editor create and manage other Editors?**
A: No. Only Managers and Admins can create/manage users.

**Q: Do quotes expire or get archived?**
A: Currently no expiration. Admins can manually archive old quotes.

**Q: Can permissions be set per-project?**
A: Not in current version. All permissions are role-based and global.

**Q: What's the difference between Manager and Admin?**
A: Managers can manage users and content but cannot access system settings, API keys, or logs. Admins have full access.

---

**Last Updated:** April 18, 2026  
**Version:** 1.0.0
