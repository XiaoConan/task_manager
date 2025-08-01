# Task Manager App

A simple full-stack task management app with user authentication using the MERN stack (MongoDB, Express, React, Node.js) and JWT.

## Features

- User registration and login with JWT
- Create, read, update, delete tasks
- Filter tasks by status
- Sort tasks by creation date (ascending/descending)
- Responsive UI with TailwindCSS

## Tech Stack

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Node.js + Express + MongoDB + Mongoose
- Authentication: JSON Web Tokens (JWT)
- HTTP Client: Axios

## Setup Instructions

### Backend

1. Go to the backend folder.
2. Install dependencies.
```bash
cd backend
npm install
```
3. Make sure your MongoDB database is running locally, create a .env file in the backend folder with the following:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```
4. Start the backend server:
```bash
npm run dev
```

### Frontend
1. Start a new terminal, go to the frontend folder.
2. Install dependencies.
```bash
cd frontend
npm install
```
3. Start Frontend Dev Server:
```bash
npm run dev
```
4. Visit http://localhost:5173 in your browser.

## Project Development Process

This project was built as a full-stack task management app using the MERN stack (MongoDB, Express.js, React, Node.js), with additional tools like Tailwind CSS for styling and JWT for user authentication.

### Backend Development

- **Initial Setup:**  
  Set up the Express server and connected to MongoDB using Mongoose. Created a `Task` model with fields for title, description, status, and timestamps.

- **API Design:**  
  Implemented RESTful endpoints for creating, reading, updating, and deleting tasks (`CRUD`).  
  Added advanced functionality like filtering tasks by status and sorting them by creation date.

- **Authentication:**  
  Implemented JWT-based login and signup routes.  
  Protected task-related routes using middleware that validates the token and ensures only authenticated users can access their tasks.

### Frontend Development

- **Setup with Vite + React + TypeScript:**  
  Used Vite for fast dev server performance. TypeScript helped with type safety and better developer experience.

- **Component Design:**  
  Created modular React components like `TaskForm`, `TaskItem`, `TaskList`, and `LoginPage`.  
  Handled routing using React Router to switch between the login page and task dashboard.

- **Authentication Workflow:**  
  Combined login and signup into one UI. Stored JWT in `localStorage` after login. Used token in the request headers to access protected API routes.

- **API Abstraction:**  
  All HTTP requests were abstracted into service files using Axios. This improved code reusability and separation of concerns.

- **UI/UX Improvements:**  
  Used Tailwind CSS to build a clean and responsive interface quickly. Improved form layouts, error handling, and conditional rendering for a smoother user experience.

## Development Notes

### Key Decisions

- **JWT for Authentication:**  
  JSON Web Tokens (JWT) were chosen for handling authentication because they allow for stateless, secure, and scalable session management without the need to store sessions server-side. This keeps the backend simple and makes it easy to integrate with frontend route guards and protected API calls.

- **Axios Service Layer:**  
  Axios was used to handle HTTP requests, and all API calls were abstracted into a dedicated service file. This promotes code reusability, centralized error handling, and cleaner component logic.

- **Tailwind CSS for Styling:**  
  Tailwind CSS was selected for its utility-first approach that enables rapid UI development and easy responsiveness without writing custom CSS. This made the interface clean, modern, and highly maintainable.

- **Vite with React + TypeScript:**  
  Vite was chosen over CRA for faster development experience with instant hot module replacement. React + TypeScript provides a strong typing system, which reduces bugs and improves developer productivity.

- **MERN Stack Architecture:**  
  A full-stack architecture using MongoDB, Express.js, React, and Node.js ensures a consistent JavaScript-based development experience across the entire stack. This allowed for faster development and easier debugging.

- **Modular Component Design:**  
  Components such as `TaskForm`, `TaskItem`, and `LoginPage` are separated to promote reusability and maintainability.

- **Single Page Application (SPA) with React Router:**  
  Using React Router allowed for navigation between pages (Login, Tasks) without full page reloads, improving performance and user experience.

- **Error Handling and Validation:**  
  Backend includes proper status codes and messages. On the frontend, user input is validated and user-friendly alerts are provided for feedback.

- **Token Storage in LocalStorage:**  
  Tokens are stored in `localStorage` for simplicity, enabling persistent login sessions across page reloads. In production, further considerations like refresh tokens or HttpOnly cookies may be adopted for enhanced security.


