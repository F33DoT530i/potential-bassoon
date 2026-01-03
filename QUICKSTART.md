# Quick Start Guide

This guide will help you get the Potential Bassoon application up and running quickly.

## Prerequisites Check

Before starting, verify you have:
- ✅ Node.js v18+ installed: `node --version`
- ✅ MongoDB installed and running: `mongod --version`
- ✅ npm or yarn package manager: `npm --version`

## Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/F33DoT530i/potential-bassoon.git
cd potential-bassoon

# Install all dependencies (backend + frontend)
npm run install-all
```

### 2. Configure Backend

```bash
# Navigate to backend directory
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your settings
# You MUST change JWT_SECRET in production!
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux with systemd
sudo systemctl start mongod

# Windows
# MongoDB service should auto-start if installed as a service
```

### 4. Start the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
You should see: "Server running in development mode on port 5000"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see: "Local: http://localhost:3000"

### 5. Access the Application

Open your browser and navigate to: **http://localhost:3000**

## First-Time User Journey

1. **Register**: Click "Register" and create a new account
2. **Login**: After registration, you'll be automatically logged in
3. **Create Task**: Click the "+ New Task" button
4. **Manage Tasks**: View, edit, update status, or delete tasks
5. **Logout**: Click "Logout" in the navigation bar when done

## API Testing

You can test the API directly using curl or Postman:

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned `token` from the response.

### Get Tasks (requires authentication)
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Backend won't start
- **Problem**: "MongoDB connection failed"
- **Solution**: Make sure MongoDB is running (`mongod`)

### Frontend shows connection errors
- **Problem**: "Network Error" or "Cannot connect to API"
- **Solution**: Verify backend is running on port 5000

### Rate limit errors
- **Problem**: "Too many requests"
- **Solution**: Wait 15 minutes or adjust rate limits in `backend/src/middleware/rateLimiter.ts`

### Port already in use
- **Problem**: "Port 5000 is already in use"
- **Solution**: 
  ```bash
  # Find and kill the process using port 5000
  # Linux/Mac:
  lsof -ti:5000 | xargs kill
  
  # Or change the port in backend/.env
  PORT=5001
  ```

## Project Structure Overview

```
potential-bassoon/
├── backend/           # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database schemas
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── config/        # Configuration
│   └── package.json
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Helper functions
│   └── package.json
└── README.md
```

## Development Tips

### Hot Reload
Both backend and frontend support hot reload:
- Backend: Changes automatically restart the server
- Frontend: Changes automatically refresh the browser

### Debugging
- Backend logs appear in the terminal running `npm run dev`
- Frontend errors appear in the browser console (F12)

### Testing
Run tests for the backend:
```bash
cd backend
npm test
```

## Next Steps

After getting the application running:
1. Explore the code structure
2. Read the main README.md for detailed API documentation
3. Try modifying components to understand the architecture
4. Add new features or customize the UI

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review the main README.md
3. Check console logs for errors
4. Open an issue on GitHub

Happy coding! 🚀
