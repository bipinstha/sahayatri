# Sahayatri Nirman Sewa - Construction Excellence Platform

A comprehensive web application for Sahayatri Nirman Sewa Pvt. Ltd., a Class-A construction company specializing in earthquake-resilient infrastructure in Nepal.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Infrastructure Architecture](#infrastructure-architecture)
- [Application Architecture](#application-architecture)
- [How the Application Works](#how-the-application-works)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Data Storage (JSON Files)](#-data-storage-json-files)
- [Features](#features)

---

## 🏢 Project Overview

**Sahayatri Nirman Sewa** is a multilingual construction company website and management platform that showcases:

- Construction services and expertise
- Portfolio of completed and ongoing projects
- Client testimonials and success stories
- Budget estimation tool
- Quote/inquiry request system
- Admin dashboard for content management

The platform supports **English and Nepali** languages with a modern, responsive design and includes a comprehensive admin panel for managing all content.

---

## 🏗️ Infrastructure Architecture

### Cloud Infrastructure (AWS + Terraform)

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS Cloud (ap-south-1)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         S3 - Static Website Hosting                    │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
  │  │  UI Assets (HTML, CSS, JS, Images)                   │  │ │
│  │  │  - Cloudfront CDN Distribution                   │  │ │
│  │  │  - CORS enabled for cross-origin requests        │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                           ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │    AWS Lambda - Serverless Backend (lambda-service)    │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  - Authentication & Authorization                │  │ │
│  │  │  - Content Management (CRUD operations)          │  │ │
│  │  │  - Quote Request Handling                        │  │ │
│  │  │  - Event-driven processing                       │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                           ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  JSON File Storage (Lambda /data directory)            │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  - users.json (Users & Authentication)          │  │ │
│  │  │  - projects.json (Projects & Services)          │  │ │
│  │  │  - testimonials.json (Client Testimonials)      │  │ │
│  │  │  - quotes.json (Quote Requests)                 │  │ │
│  │  │  - stats.json (Company Statistics)              │  │ │
│  │  │  - Persisted in Lambda filesystem               │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │    API Gateway                                         │ │
│  │  - Route requests to Lambda                            │ │
│  │  - Rate limiting & throttling                          │ │
│  │  - CORS handling                                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

     ▲ HTTPS/TLS
     │
     ▼ HTTP Requests
     
┌───────────────────┐
│   Client Browser  │
│   (User/Admin)    │
└───────────────────┘
```

### Key AWS Services

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **S3** | UI static files & assets | Public read access, CORS enabled |
| **CloudFront** | CDN for fast content delivery | Caching, SSL/TLS certificates |
| **Lambda** | Serverless backend API | JSON file storage, environment variables |
| **API Gateway** | HTTP request routing | RESTful endpoints, rate limiting |
| **IAM** | Identity & access management | Lambda execution roles, S3 policies |

### Terraform Infrastructure as Code

Located in `/terraform/` directory:

```hcl
main.tf         # Core AWS resources
variables.tf    # Input variables (region, project suffix, etc.)
terraform.tfvars # Variable values (prod/staging configs)
terraform.tfstate # State file (tracks current infrastructure)
```

**Key Resources:**
- S3 bucket for UI
- CloudFront distribution
- Lambda function (API backend)
- RDS PostgreSQL instance
- IAM roles and policies
- API Gateway configuration

---

## 🎯 Application Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 PRESENTATION LAYER                          │
│                       (UI)                                  │
├─────────────────────────────────────────────────────────────┤
│  • index.html - Public website                              │
│  • admin.html - Admin dashboard                             │
│  • Responsive UI (Mobile, Tablet, Desktop)                  │
│  • Multilingual Support (EN/NE)                             │
│  • Dark Mode / Light Mode                                   │
│  • TailwindCSS + Custom Styling                             │
└─────────────────────────────────────────────────────────────┘
                         ▲
          API Calls (JSON/REST)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                      │
│                    (Backend Services)                       │
├─────────────────────────────────────────────────────────────┤
│  Lambda Handler (lambda-service/index.js)                   │
│  ├─ Authentication Service                                  │
│  │  ├─ Login / Signup                                       │
│  │  ├─ Token Verification (JWT)                             │
│  │  └─ Role-based Access Control                            │
│  ├─ Content Service (CRUD)                                  │
│  │  ├─ Projects Management                                  │
│  │  ├─ Services Management                                  │
│  │  ├─ Testimonials                                         │
│  │  └─ Statistics                                           │
│  ├─ User Service                                            │
│  │  ├─ User Management                                      │
│  │  └─ Permission Management                                │
│  └─ Quote Service                                           │
│     └─ Quote Request Handling                               │
└─────────────────────────────────────────────────────────────┘
                         ▲
         Database Queries (SQL)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
│                    (Database)                               │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL Database (RDS)                                  │
│  ├─ users table                                             │
│  ├─ projects table                                          │
│  ├─ services table                                          │
│  ├─ testimonials table                                      │
│  ├─ stats table                                             │
│  ├─ quotes table                                            │
│  └─ audit logs (optional)                                   │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
sahayatri/
├── ui/                          # Public & Admin UI
│   ├── index.html               # Main website
│   ├── admin.html               # Admin dashboard
│   ├── js/
│   │   ├── script.js            # Main website logic
│   │   ├── admin.js             # Admin dashboard logic
│   │   ├── data.js              # Data management
│   │   └── theme.js             # Dark/Light mode
│   ├── css/
│   │   └── style.css            # Custom styles
│   ├── img/                     # Images & assets
│   └── favicon/                 # Favicon files
│
├── lambda-service/              # AWS Lambda backend (Serverless)
│   ├── index.js                 # Main Lambda handler
│   ├── config/
│   │   └── constants.js         # Environment variables
│   ├── services/
│   │   ├── authService.js       # Authentication logic
│   │   ├── userService.js       # User management
│   │   └── contentService.js    # Content CRUD
│   ├── utils/
│   │   ├── auth.js              # JWT verification
│   │   ├── storage.js           # Data file operations
│   │   └── response.js          # Response formatting
│   ├── data/                    # JSON data storage
│   │   ├── users.json
│   │   ├── projects.json
│   │   ├── services.json
│   │   ├── testimonials.json
│   │   ├── quotes.json
│   │   └── stats.json
│   └── package.json
│
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                 # AWS resources
│   ├── variables.tf            # Input variables
│   ├── terraform.tfvars        # Variable values
│   └── terraform.tfstate       # Current state
│
└── features/                    # Feature documentation
    ├── USER-FEATURE.MD
    └── USER-FEATURE-IMPLEMENTATION.md
```

---

## 🔄 How the Application Works

### User Journey - Public Website

```
1. VISIT WEBSITE
   ├─ Browser loads index.html
   ├─ CSS/JS resources load (TailwindCSS, custom styles)
   ├─ theme.js initializes (checks saved theme preference)
   └─ script.js loads content from Lambda API

2. BROWSE CONTENT
   ├─ View projects portfolio (filtered by category)
   ├─ Read services descriptions
   ├─ Check client testimonials
   ├─ Review company statistics
   └─ Use budget estimator tool

3. REQUEST QUOTE
   ├─ Fill quote form
   ├─ Submit request
   ├─ UI validates input
   ├─ POST /api/quotes → Lambda
   ├─ Lambda stores in JSON file
   ├─ Admin receives notification
   └─ User sees success message

4. LANGUAGE & THEME
   ├─ Toggle between English/Nepali (i18n)
   ├─ Switch Light/Dark mode
   └─ Preferences stored in localStorage
```

### Admin Journey - Admin Dashboard

```
1. AUTHENTICATE
   ├─ Visit admin.html
   ├─ Enter email & password
   ├─ POST /api/auth/login → Lambda
   ├─ Lambda verifies credentials (bcrypt)
   ├─ JWT token returned & stored
   └─ Admin dashboard unlocked

2. MANAGE CONTENT
   ├─ Users Tab
   │  ├─ View all users
   │  ├─ Add/Edit/Delete users
   │  ├─ Assign roles (admin, manager, editor, viewer, guest)
   │  └─ Manage permissions
   ├─ Projects Tab
   │  ├─ View all projects
   │  ├─ Add new project (with specs)
   │  ├─ Edit existing projects
   │  └─ Delete projects
   ├─ Services Tab
   │  ├─ Manage service listings
   │  ├─ Add/Edit/Delete services
   │  └─ Reorder services
   ├─ Testimonials Tab
   │  ├─ View client testimonials
   │  ├─ Add/Edit/Delete testimonials
   │  └─ Manage ratings
   ├─ Quote Requests Tab
   │  ├─ View incoming quote requests
   │  ├─ Filter by status
   │  ├─ View request details
   │  └─ Archive/Delete requests
   └─ Stats Tab
      ├─ Update company statistics
      ├─ Years of experience
      ├─ Projects completed
      └─ Happy clients count

3. AUTHORIZATION
   ├─ Token included in Authorization header
   ├─ Lambda verifies JWT signature
   ├─ Role-based access control applied
   ├─ Request allowed/denied based on role
   └─ Audit logs maintained (optional)
```

### Backend Processing Flow

```
HTTP REQUEST
     ▼
┌──────────────────────┐
│ API Gateway          │ ← Rate limiting, CORS
└──────────────────────┘
     ▼
┌──────────────────────┐
│ Lambda Handler       │ ← Parse request
│ (index.js)           │
└──────────────────────┘
     ▼
┌──────────────────────────────────────┐
│ Route Detection                      │
│ (GET /api/projects → contentService) │
└──────────────────────────────────────┘
     ▼
┌──────────────────────┐
│ Authentication       │ ← Verify JWT Token
│ (if needed)          │
└──────────────────────┘
     ▼
┌──────────────────────┐
│ Authorization        │ ← Check user role/permissions
└──────────────────────┘
     ▼
┌──────────────────────┐
│ Business Logic       │ ← Execute service
│ (authService,        │   (create, read, update, delete)
│  userService, etc.)  │
└──────────────────────┘
     ▼
┌──────────────────────┐
│ File I/O Operations  │ ← JSON file read/write
│ (Filesystem)         │
└──────────────────────┘
     ▼
┌──────────────────────┐
│ Format Response      │ ← createResponse()
│ (JSON)               │
└──────────────────────┘
     ▼
HTTP RESPONSE (200, 400, 401, 403, 404, 500)
```

### Data Flow Diagram

```
┌────────────────┐
│ User Browser   │
└────────────────┘
     ▲ │
     │ │ JavaScript Fetch/XHR
     │ ▼
┌────────────────────────────────────┐
│ UI JavaScript (script.js, admin.js)│
│ - Form handling                    │
│ - Data binding                     │
│ - User interactions                │
└────────────────────────────────────┘
     ▲ │
     │ │ JSON/REST API
     │ ▼
┌─────────────────────────────────┐
│ AWS Lambda Function             │
│ - Route handler                 │
│ - Authentication                │
│ - Business logic                │
└─────────────────────────────────┘
     ▲ │
     │ │ SQL Queries
     │ ▼
┌─────────────────────────────────┐
│ JSON File Storage (Lambda /data)    │
│ - Persistent data in files          │
│ - Simple and lightweight            │
│ - Easy to backup                    │
└─────────────────────────────────────┘
```

---

## 💻 Technology Stack

### User Interface (UI)
- **HTML5** - Semantic markup
- **CSS3** - Styling (TailwindCSS v4 CDN)
- **JavaScript (ES6+)** - Client-side logic
- **Multilingual Support** - i18n/Localization
- **Dark Mode** - CSS custom properties + JS
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - HTTP server (development)
- **AWS Lambda** - Serverless compute (production)
- **PostgreSQL** - Relational database
- **JWT (JSON Web Tokens)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment configuration

### Infrastructure
- **Terraform** - Infrastructure as Code
- **AWS S3** - Static file hosting
- **AWS CloudFront** - CDN
- **AWS Lambda** - Serverless API with JSON file storage
- **AWS API Gateway** - Request routing
- **AWS IAM** - Access control

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- AWS Account (for deployment)
- Terraform 1.0+ (for infrastructure)
- Git
- Live server or Python for local UI testing

### Local Development Setup

#### 1. Clone Repository
```bash
git clone <repository-url>
cd sahayatri
```

#### 2. Setup UI (Development)
```bash
# Option 1: Using Python SimpleHTTPServer
cd ui
python3 -m http.server 5500

# Option 2: Using Node Live Server
npm install -g live-server
live-server --port=5500
```

Access website at `http://localhost:5500`

#### 3. Test Lambda Service Locally (Optional)
```bash
# Lambda service is deployed to AWS
# It uses JSON file storage at: lambda-service/data/
# The service reads/writes to these JSON files:
#   - users.json
#   - projects.json
#   - services.json
#   - testimonials.json
#   - quotes.json
#   - stats.json

# To test Lambda locally during development:
cd lambda-service
npm install
# Run local tests with AWS SAM or serverless framework
```

---

## 📦 Deployment

### AWS Lambda Deployment

#### 1. Prepare Lambda Function
```bash
cd lambda-service
npm install
zip -r lambda.zip .
```

#### 2. Deploy Infrastructure with Terraform
```bash
cd ../../terraform

# Initialize Terraform
terraform init

# Review changes
terraform plan

# Apply changes
terraform apply
```

#### 3. Upload Lambda Function
```bash
# Via AWS CLI
aws lambda update-function-code \
  --function-name sahayatri-api \
  --zip-file fileb://lambda.zip \
  --region ap-south-1

# Or via Terraform (automatic)
```

#### 4. Deploy UI to S3
```bash
# Sync UI files to S3
aws s3 sync ui/ s3://sahayatri-web-frontend-prod/

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1234EXAMPLE \
  --paths "/*"
```

---

## 📡 API Documentation

### Base URL
- **Local Development**: `http://localhost:3000`
- **Production**: `https://2ytrivx9bl.execute-api.ap-south-1.amazonaws.com`

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "SecurePass123"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "eyJhbGc..."
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### Content Endpoints

#### Get All Projects
```
GET /api/projects
Authorization: Bearer <token>

Response (200):
[
  {
    "id": 1,
    "name_key": "proj_1_name",
    "location_key": "loc_bhaktapur",
    "category": "residential",
    "image": "img/project1.jpg",
    "specs": {
      "area": "5,000 sq. ft.",
      "duration": "12 months"
    }
  }
]
```

#### Create Project
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name_key": "proj_new",
  "location_key": "loc_new",
  "category": "commercial",
  "image": "img/new_project.jpg",
  "desc_key": "proj_new_desc",
  "specs": { "area": "10,000 sq. ft." }
}

Response (201):
{ "id": 2, "message": "Project created" }
```

#### Update Project
```
PUT /api/projects/1
Authorization: Bearer <token>
Content-Type: application/json

{ "status_key": "stat_completed" }

Response (200):
{ "message": "Project updated" }
```

#### Delete Project
```
DELETE /api/projects/1
Authorization: Bearer <token>

Response (200):
{ "message": "Project deleted" }
```

### Quote Endpoints

#### Submit Quote Request
```
POST /api/quotes
Content-Type: application/json

{
  "name": "Client Name",
  "email": "client@example.com",
  "category": "Residential",
  "message": "Interested in building a home"
}

Response (201):
{
  "id": 1,
  "message": "Quote request submitted successfully"
}
```

#### Get Quote Requests
```
GET /api/quotes
Authorization: Bearer <token>

Response (200):
[
  {
    "id": 1,
    "name": "Client Name",
    "email": "client@example.com",
    "category": "Residential",
    "message": "...",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

---

## � Data Storage (JSON Files)

The Lambda service uses JSON files for data persistence. Files are stored in the `lambda-service/data/` directory and are managed by the `utils/storage.js` module.

### Data File Structure

#### users.json
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "password_hash": "$2b$10$...",
    "role": "admin",
    "status": "active",
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

#### projects.json
```json
[
  {
    "id": 1,
    "name_key": "proj_1_name",
    "location_key": "loc_bhaktapur",
    "status_key": "stat_completed",
    "desc_key": "proj_1_desc",
    "category": "residential",
    "image": "img/project1.jpg",
    "specs": {
      "area": "5,000 sq. ft.",
      "duration": "12 months"
    },
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

#### services.json
```json
[
  {
    "id": 1,
    "title_key": "svc_1_title",
    "desc_key": "svc_1_desc",
    "image": "img/service1.jpg"
  }
]
```

#### testimonials.json
```json
[
  {
    "id": 1,
    "name": "Client Name",
    "role_key": "test_1_role",
    "text_key": "test_1_text",
    "rating": 5,
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

#### quotes.json
```json
[
  {
    "id": 1,
    "name": "Client Name",
    "email": "client@example.com",
    "category": "Residential",
    "message": "Project inquiry...",
    "status": "new",
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

#### stats.json
```json
[
  {
    "id": 1,
    "years_experience": 15,
    "projects_completed": 50,
    "happy_clients": 100,
    "million_sqft_built": 2.5,
    "updated_at": "2024-01-01T10:00:00Z"
  }
]
```

### Data Management
- Files are read from disk by `lambda-service/utils/storage.js`
- All CRUD operations are performed on JSON arrays
- Changes are persisted to files automatically
- Data is lightweight and easy to backup
- No external database required

---

## ✨ Features

### Public Website Features
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Multilingual support (English & Nepali)
- ✅ Dark/Light mode theme switching
- ✅ Project portfolio with filtering
- ✅ Budget estimation calculator
- ✅ Quote request form
- ✅ Client testimonials
- ✅ Company statistics
- ✅ SEO optimized
- ✅ Accessibility (WCAG 2.1 AA)

### Admin Dashboard Features
- ✅ User authentication & role-based access control
- ✅ User management (Create, Read, Update, Delete)
- ✅ Project management (CRUD operations)
- ✅ Service management
- ✅ Testimonial management
- ✅ Quote request management
- ✅ Statistics management
- ✅ Toast notifications for feedback
- ✅ Modal forms for data entry
- ✅ Search and filter capabilities
- ✅ Responsive admin UI
- ✅ Dark mode support

### Technical Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ CORS support
- ✅ Error handling & validation
- ✅ Internationalization (i18n)
- ✅ Environment-based configuration
- ✅ Serverless architecture (Lambda)
- ✅ Infrastructure as Code (Terraform)
- ✅ JSON file-based data storage
- ✅ Rate limiting (API Gateway)

---

## 🔐 Security Considerations

- **Password Hashing**: bcryptjs with salt rounds=10
- **JWT Tokens**: Signed with HS256, configurable expiration
- **CORS**: Configured to prevent unauthorized cross-origin requests
- **File Access**: Restricted file operations for data storage
- **Rate Limiting**: AWS API Gateway throttling
- **HTTPS/TLS**: Enforced for all communications
- **Environment Variables**: Secrets stored securely, never committed
- **Role-Based Access Control**: Fine-grained permissions by role

---

## 📊 Performance Optimization

- **CDN**: CloudFront for UI asset delivery
- **Lazy Loading**: Images load on demand
- **Caching**: Browser and server-side caching
- **Minification**: CSS/JS minification via build tools
- **File I/O**: Efficient JSON file read/write operations
- **Serverless**: Auto-scaling with Lambda
- **API Response Compression**: gzip compression enabled

---

## 🐛 Troubleshooting

### Lambda Function Errors
```bash
# View CloudWatch logs
aws logs tail /aws/lambda/sahayatri-api --follow

# Update environment variables
aws lambda update-function-configuration \
  --function-name sahayatri-api \
  --environment Variables={KEY=value}
```

### Data File Issues
```bash
# Check if JSON data files exist
ls -la lambda-service/data/

# Verify JSON file integrity
cat lambda-service/data/users.json | jq .

# Restore from backup if corrupted
cp lambda-service/data/backup/users.json lambda-service/data/users.json
```

### UI Not Loading
- Clear browser cache (Ctrl+Shift+Del)
- Check browser console for errors (F12)
- Verify S3 bucket policy
- Check CloudFront distribution status

---

## 📧 Contact & Support

**Company**: Sahayatri Nirman Sewa Pvt. Ltd.
**Location**: Kathmandu - 15, Nepal
**Email**: sahayatro.c@gmail.com

---

## 📄 License

ISC

---

**Last Updated**: April 2026
**Version**: 1.0.0
