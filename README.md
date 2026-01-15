# Task Manager – Backend Assignment

A backend-focused task management application built using Node.js, Express, and MongoDB, with authentication, role-based access control (RBAC), and a simple frontend UI for testing APIs.

## Features

### Backend

    - User registration & login with JWT authentication
    - Password hashing using bcrypt
    - Role-based access control (user / admin)
    - CRUD operations for tasks
    - Task ownership enforcement
    - API versioning (/api/v1)
    - Centralized error handling
    - MongoDB database using Mongoose

### Frontend (Supportive UI)

    - Built using Vanilla JavaScript, HTML, CSS
    - Login & registration pages
    - Protected dashboard (JWT required)
    - Create tasks (Home)
    - View & manage tasks (All Tasks)
    - Update task status (To Do / In Progress / Done)
    - Profile view (name, email, role)
    - Logout functionality

## Tech Stack

    - Backend: Node.js, Express.js
    - Database: MongoDB, Mongoose
    - Authentication: JWT, bcrypt
    - Frontend: HTML, CSS, Vanilla JavaScript
    - Tools: Git, GitHub, Postman

## Project Structure
```bash
backend-assignment/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── app.js
│   └── styles.css
│
├── .gitignore
└── README.md
```
## Authentication Flow

    - Users authenticate via JWT
    - Token is stored in localStorage
    - Protected routes require Authorization: Bearer <token>
    - Logged-in user details are fetched using /api/v1/auth/me


## Role-Based Access Control (RBAC)

    Users

        Can create, view, update, and delete only their own tasks

    Admins

        Have elevated permissions (can delete any task)

RBAC is enforced at the controller level using role information from the JWT

## Running the Project Locally

1. Backend Set Up
```bash
cd backend
npm install
npm run dev
```

Create a .env file inside backend/:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

The backend will start at:
http://localhost:5000

2. Frontend Set Up
Open the frontend using any of the following:
    Open frontend/register.html directly in browser

## API Endpoints (Overview)

1. Auth
```bash
    POST /api/v1/auth/register

    POST /api/v1/auth/login

    GET /api/v1/auth/me
```
2. Tasks
```bash
    GET /api/v1/tasks

    POST /api/v1/tasks

    GET /api/v1/tasks/:id

    PUT /api/v1/tasks/:id

    DELETE /api/v1/tasks/:id
```
## Scalability Notes

Stateless JWT authentication

Modular controller–route structure

Ready for Redis caching

Can be containerized using Docker

Easily extendable to microservices architecture



## Notes
This project was built as part of a backend developer internship assignment.
