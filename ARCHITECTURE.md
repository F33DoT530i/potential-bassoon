# Architecture Overview

This document provides a high-level overview of the Potential Bassoon application architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    FRONTEND (React)                       │ │
│  │                   Port: 3000 (dev)                        │ │
│  │                                                           │ │
│  │  Components:                                              │ │
│  │  • Login/Register Pages                                   │ │
│  │  • Dashboard with Task List                               │ │
│  │  • Task Form (Create/Edit)                                │ │
│  │  • Protected Routes                                       │ │
│  │  • API Service (Axios)                                    │ │
│  └───────────────────────┬───────────────────────────────────┘ │
└────────────────────────────┼─────────────────────────────────────┘
                             │ HTTP/HTTPS
                             │ REST API Calls
                             │ JWT Token in Headers
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (Express)                     │
│                        Port: 5000                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    MIDDLEWARE LAYER                      │  │
│  │  • CORS Configuration                                    │  │
│  │  • Rate Limiting (express-rate-limit)                    │  │
│  │  • Request Logger                                        │  │
│  │  • Authentication (JWT Verification)                     │  │
│  │  • Error Handler                                         │  │
│  │  • Input Validation (Joi)                                │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                       │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │                   ROUTING LAYER                          │  │
│  │  • /api/auth    → Authentication Routes                 │  │
│  │  • /api/tasks   → Task Management Routes                │  │
│  │  • /api/health  → Health Check                          │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                       │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │                 CONTROLLER LAYER                         │  │
│  │  • authController: register, login, getMe               │  │
│  │  • taskController: CRUD operations                      │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                       │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │                    MODEL LAYER                           │  │
│  │  • User Model (Mongoose Schema)                         │  │
│  │  • Task Model (Mongoose Schema)                         │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │ MongoDB Driver
                          │ (Mongoose ODM)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                           │
│                    Port: 27017 (default)                        │
│                                                                 │
│  Collections:                                                   │
│  • users    → User accounts (hashed passwords)                 │
│  • tasks    → User tasks with status tracking                  │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow Example

### User Registration Flow

```
1. User fills registration form → Frontend
2. Frontend validates input
3. POST /api/auth/register with {email, password, name}
4. Backend → Rate Limiter → Check limit
5. Backend → Joi Validator → Validate input
6. Backend → Controller → Check if user exists
7. Backend → Model → Hash password with bcrypt
8. Backend → MongoDB → Save user document
9. Backend → Generate JWT token
10. Backend → Response {user, token}
11. Frontend → Store token in localStorage
12. Frontend → Redirect to Dashboard
```

### Authenticated Task Creation Flow

```
1. User clicks "New Task" → Frontend
2. User fills task form
3. POST /api/tasks with Authorization header
4. Backend → Rate Limiter → Check limit (10/min for creates)
5. Backend → Auth Middleware → Verify JWT token
6. Backend → Auth Middleware → Load user from token
7. Backend → Joi Validator → Validate task data
8. Backend → Controller → Create task with userId
9. Backend → MongoDB → Save task document
10. Backend → Response {task}
11. Frontend → Update task list
12. Frontend → Show success message
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     SECURITY FEATURES                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. RATE LIMITING                                          │
│     • Auth endpoints: 5 requests/15min                     │
│     • Task creation: 10 requests/min                       │
│     • General API: 100 requests/15min                      │
│                                                             │
│  2. AUTHENTICATION                                          │
│     • JWT tokens with expiration                           │
│     • Secure token storage                                 │
│     • Protected routes and endpoints                       │
│                                                             │
│  3. PASSWORD SECURITY                                       │
│     • bcrypt hashing (10 rounds)                           │
│     • Passwords never stored in plaintext                  │
│     • Minimum password length enforced                     │
│                                                             │
│  4. INPUT VALIDATION                                        │
│     • Joi schema validation                                │
│     • Type checking with TypeScript                        │
│     • Mongoose schema validation                           │
│                                                             │
│  5. ERROR HANDLING                                          │
│     • No sensitive data in error messages                  │
│     • Centralized error handling                           │
│     • Proper HTTP status codes                             │
│                                                             │
│  6. CORS CONFIGURATION                                      │
│     • Restricted to frontend origin                        │
│     • Credentials support enabled                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Stack
```
React 18 (UI Library)
  ├── TypeScript (Type Safety)
  ├── React Router (Navigation)
  ├── Axios (HTTP Client)
  └── Vite (Build Tool)
```

### Backend Stack
```
Node.js + Express (Server)
  ├── TypeScript (Type Safety)
  ├── Mongoose (MongoDB ODM)
  ├── JWT (Authentication)
  ├── bcrypt (Password Hashing)
  ├── Joi (Validation)
  ├── express-rate-limit (Rate Limiting)
  └── CORS (Cross-Origin)
```

### Database
```
MongoDB (NoSQL Database)
  ├── Users Collection
  └── Tasks Collection
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  createdAt: Date (auto)
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  status: String (pending|in-progress|completed),
  userId: ObjectId (ref: User),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - List all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Health
- `GET /api/health` - Server health check

## Development Workflow

```
Developer writes code
      ↓
TypeScript compilation
      ↓
ESLint (optional)
      ↓
Jest tests (backend)
      ↓
Manual testing
      ↓
Git commit
      ↓
Deploy
```

## Deployment Considerations

### Environment Variables
```
Backend:
- PORT
- NODE_ENV
- MONGODB_URI
- JWT_SECRET (CRITICAL!)
- JWT_EXPIRE
- FRONTEND_URL

Frontend:
- VITE_API_URL (if not using proxy)
```

### Build Commands
```bash
# Backend
npm run build  # Creates dist/ folder
npm start      # Runs from dist/

# Frontend
npm run build  # Creates dist/ folder
npm run preview # Preview production build
```

## Monitoring & Logging

The application includes:
- Request logging middleware (timestamps, method, path, status, duration)
- Error logging with stack traces (development)
- MongoDB connection status
- Server startup confirmation

## Scalability Considerations

Future improvements for production:
1. Add Redis for session management and caching
2. Implement WebSocket for real-time updates
3. Add message queue (e.g., Bull) for background jobs
4. Containerize with Docker
5. Add horizontal scaling with load balancer
6. Implement database replication
7. Add comprehensive monitoring (e.g., Prometheus, Grafana)
8. Implement CI/CD pipeline
