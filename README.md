# Potential Bassoon - Full-Stack Task Manager Application

A modern, full-stack web application built with React, Node.js/Express, and MongoDB. This application demonstrates a complete architecture with frontend, backend, and middleware layers working together seamlessly.

## 🏗️ Architecture Overview

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design

### **Backend**
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi schema validation

### **Middleware**
- **Authentication Middleware**: JWT token verification
- **Error Handling**: Centralized error handling with custom error types
- **CORS**: Cross-Origin Resource Sharing configuration
- **Request Logging**: Custom logger middleware
- **Request Validation**: Input validation using Joi

## 📋 Features

- ✅ User authentication (Register/Login) with JWT
- ✅ Protected routes and API endpoints
- ✅ CRUD operations for tasks
- ✅ Task status management (Pending, In Progress, Completed)
- ✅ Responsive UI design
- ✅ Error handling and validation
- ✅ Request logging
- ✅ RESTful API design

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/F33DoT530i/potential-bassoon.git
   cd potential-bassoon
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/potential-bassoon
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

   **Important**: Change `JWT_SECRET` to a strong, random string in production!

2. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On macOS (using Homebrew)
   brew services start mongodb-community

   # On Linux (using systemd)
   sudo systemctl start mongod

   # On Windows
   # MongoDB should start automatically if installed as a service
   ```

## 🏃 Running the Application

### Development Mode

You need to run both the backend and frontend servers:

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend API will be available at `http://localhost:5000`

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

3. **Access the Application**
   
   Open your browser and navigate to `http://localhost:3000`

### Production Build

1. **Build the Backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Running Specific Tests
```bash
cd backend
npm test -- --testPathPattern=app.test
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Authentication
- **POST** `/api/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/me` - Get current user (requires authentication)
  ```
  Headers: Authorization: Bearer <token>
  ```

#### Tasks (All require authentication)
- **GET** `/api/tasks` - Get all tasks for current user
- **GET** `/api/tasks/:id` - Get a specific task
- **POST** `/api/tasks` - Create a new task
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
  ```
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

#### Health Check
- **GET** `/api/health` - Check if the server is running

## 🗂️ Project Structure

```
potential-bassoon/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   ├── index.ts      # Environment variables
│   │   │   └── database.ts   # Database connection
│   │   ├── controllers/      # Request handlers
│   │   │   ├── authController.ts
│   │   │   └── taskController.ts
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # JWT authentication
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   ├── models/           # Mongoose models
│   │   │   ├── User.ts
│   │   │   └── Task.ts
│   │   ├── routes/           # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── taskRoutes.ts
│   │   │   └── index.ts
│   │   ├── __tests__/        # Test files
│   │   ├── app.ts            # Express app setup
│   │   └── server.ts         # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── services/         # API services
│   │   │   └── api.ts
│   │   ├── types/            # TypeScript types
│   │   │   └── index.ts
│   │   ├── utils/            # Utility functions
│   │   │   ├── AuthContext.tsx
│   │   │   └── helpers.ts
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
├── LICENSE
└── README.md
```

## 🔐 Security Features

- **Password Hashing**: User passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Both frontend and backend routes are protected
- **Input Validation**: Request validation using Joi schemas
- **Error Handling**: Secure error messages without exposing sensitive data
- **CORS Configuration**: Controlled cross-origin access

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **Joi** - Schema validation
- **cors** - CORS middleware
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool

### Development Tools
- **ts-node-dev** - TypeScript execution and hot reload
- **Jest** - Testing framework
- **ESLint** - Code linting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, please open an issue in the GitHub repository.

## 🎯 Future Enhancements

- [ ] Add user profile management
- [ ] Implement task categories and tags
- [ ] Add task due dates and reminders
- [ ] Implement real-time updates with WebSockets
- [ ] Add file attachments to tasks
- [ ] Implement task sharing and collaboration
- [ ] Add data export functionality
- [ ] Implement email notifications
- [ ] Add dark mode support
- [ ] Create mobile app versions
