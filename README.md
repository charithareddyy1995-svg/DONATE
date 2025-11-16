# Dona✝e - Donation Platform

A web-based donation platform that connects donors with people in need.

## Features

- User registration and authentication
- Donate items (Food, Clothes, Essentials, etc.)
- Request items
- Location-based services
- Real-time notifications
- Interactive maps integration

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
3. **Git** (optional) - [Download here](https://git-scm.com/)

## Quick Start

### Option 1: One-Command Setup (Recommended)

```bash
npm run setup
```

This will install all dependencies and set up the project.

### Option 2: Manual Setup

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp backend/env.example backend/.env
   ```

3. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/donate`

4. **Start the backend server:**
   ```bash
   npm run backend
   ```

5. **Start the frontend (in a new terminal):**
   ```bash
   npm run frontend
   ```

## Running the Application

### Development Mode

- **Backend with auto-restart:**
  ```bash
  npm run backend:dev
  ```

- **Frontend:**
  ```bash
  npm run frontend
  ```

### Production Mode

- **Backend:**
  ```bash
  npm run backend
  ```

## Accessing the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Project Structure

```
DONATE/
├── backend/           # Node.js backend server
│   ├── index.js      # Main server file
│   ├── models/       # Database models
│   └── package.json  # Backend dependencies
├── frontend/         # Frontend files
│   └── index.html    # Main HTML file
├── index.html        # Root HTML file
├── index.js          # Root server file
├── package.json      # Root dependencies
└── README.md         # This file
```

## Environment Variables

Create a `.env` file in the `backend/` directory with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/donate
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change the PORT in `.env` file
   - Or kill the process using the port

2. **MongoDB connection failed:**
   - Make sure MongoDB is running
   - Check if the connection string is correct

3. **Dependencies not found:**
   - Run `npm run install:all` again

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Ensure all prerequisites are installed
3. Verify MongoDB is running
4. Check if ports 3000 and 5000 are available

## Development

### Adding New Features

1. Backend changes go in `backend/` directory
2. Frontend changes go in root directory
3. Use `npm run backend:dev` for development with auto-restart

### Database

The application uses MongoDB. Make sure to:
- Install MongoDB locally, or
- Use MongoDB Atlas (cloud service)

## License

This project is licensed under the ISC License. 