# Events calendar (js-events-app)

This project is a full-stack web application designed for searching and exploring events. The application includes a backend built with Node.js and Nest.js and a frontend developed using React.js and Next.js. The application allows users to register, log in, and search for events based on various filters like city, event type, and date.

## Project Structure

```bash
js-events-app/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── users/
│   ├── dist/
│   ├── .env
│   ├── package.json
│   ├── ...
│
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── public/
│   ├── store/
│   ├── .env
│   ├── package.json
│   ├── ...
│
├── .gitignore
├── README.md
└── package.json
```

## Technologies Used
This project utilizes a variety of technologies to provide a robust and feature-rich full-stack application. The technologies include:

- **Node.js**: JavaScript runtime built on Chrome's V8 engine for server-side operations.
- **Nest.js**: Framework for building efficient, reliable, and scalable server-side applications.
- **Next.js**: React framework for building server-rendered and statically generated web applications.
- **React**: JavaScript library for building user interfaces.
- **PostgreSQL**: Relational database management system used for storing and managing data.
- **Axios**: HTTP client for making requests to the Ticketmaster API.
- **dotenv**: Module for loading environment variables from .env files.
- **JSON Web Tokens (JWT)**: Token-based authentication used for securing API endpoints and managing user sessions.

## Features

### Backend

- **Event Search**: Users can search for events based on filters such as city, event type, and date.
- **Detailed Event Information**: Users can view detailed information about each event.
- **User Authentication**: User registration and login with token-based authentication.
- **Database Integration**: Uses PostgreSQL with TypeORM.
- **Environment Configuration**: Separate .env files for development and production environments.

### Frontend

- **React Application**: Provides an interactive user interface for searching and exploring events.
- **User Authentication**: Supports user login and session management with JWT.
- **Event Search Interface**: Users can search and filter events based on multiple criteria.
- **Responsive Design**: The UI is responsive and works well on various devices.

## Requirements

- **Node.js**: Ensure you have Node.js (version 14 or later) installed.
- **PostgreSQL**: A running PostgreSQL server to connect to.

## Getting Started

### Installation

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/js-events-app.git
   cd js-events-app
   ```

2. **Install Dependencies**

   Install both backend and frontend dependencies:

   ```bash
   # Install root dependencies (concurrently and nodemon)
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create a .env file in the root, frontend, backend directories of the project and provide the necessary environment variables. An example configuration is provided below:

   ```bash
   backend:
   API_KEY=your-api-key
   FRONTEND_URL=http://localhost:3001
   BACKEND_URL=http://localhost:3000

   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=alien
   DB_PASSWORD=alien
   DB_NAME=events_calendar

   JWT_SECRET=your-jwt-secret

   frontend:
   NODE_ENV=development
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

### Running the Application

- **Development Setup**:
  Start the server with:

   ```bash
   # From the root directory
   npm run dev
   ```

This will concurrently run the backend on http://localhost:3000 and the frontend on http://localhost:3001. The frontend will proxy API requests to the backend server.

- **Production Setup**: Build and start the application in production mode:

   ```bash
   # From the root directory
   npm run build
   npm start
   ```

## API Endpoints

### User Authentication

- **POST /users/register**: Register a new user
- **POST /users/login**: Log in an existing user

### Events

- **GET /events**: Retrieve a list of events with optional filters (city, event type, date).

## Frontend Overview

The frontend is built with React and Next.js, providing an intuitive interface for users to search and explore events. The application is designed to be responsive, ensuring a smooth experience across different devices.

### Scripts

- **Start the frontend**:
   ```bash
   npm start (from the frontend directory)
   ```
- **Build for production**:
   ```bash
   npm run build (from the frontend directory)
   ```

## Security Considerations

- **JWT Authentication**: The API uses JSON Web Tokens (JWT) for authentication. Include the token in the Authorization header for endpoints that require authentication.
- **Password Hashing**: User passwords are hashed using bcrypt before being stored in the database.
- **Environment Variable**: Store sensitive information in environment variables to keep them secure.
