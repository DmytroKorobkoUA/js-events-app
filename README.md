# Events calendar (js-events-app)

`js-events-app` is a full-stack application designed to manage and display events. The application uses a Nest.js backend to interact with the Ticketmaster API and a Next.js frontend for a responsive user interface. It will feature user registration, login, and token-based authentication, along with Redis caching and advanced filtering capabilities for events.

## Project Structure

```bash
js-events-app/
│
├── backend/
│   ├── src/
│   ├── dist/
│   ├── .env
│   ├── package.json
│   ├── ...
│
├── frontend/
│   ├── src/
│   ├── public/
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
- **Redis**: In-memory data structure store, used for caching and optimizing performance.
- **dotenv**: Module for loading environment variables from .env files.
- **JSON Web Tokens (JWT)**: Token-based authentication used for securing API endpoints and managing user sessions.
- **CI/CD**: Continuous Integration and Continuous Deployment for automated testing and deployment (to be set up on Render).
- **Docker**: Containerization platform for consistent development and deployment environments (future implementation).

## Features

### Backend

- **Event Fetching**: Retrieve events from the Ticketmaster API based on city and date.
- **User Authentication (Planned)**: User registration and login with token-based authentication.
- **Redis Caching (Planned)**: Cache frequently accessed data to optimize performance.
- **Advanced Filtering (Planned)**: Enhanced event search capabilities, including filters for event types, dates, and more.
- **Database Integration(Planned)**: Uses PostgreSQL with Sequelize ORM.
- **Docker Support**: Containerize backend services for consistent deployment.

### Frontend

- **Event Management**: User interface to search and view events.
- **Responsive Design**: Adaptable UI for different screen sizes.
- **Modular CSS**: Scoped styles for better maintainability.
- **Progressive Web App (PWA) Features(Planned)**: Support for offline functionality and improved performance.
- **Docker Support (Planned)**: Containerize frontend for consistency across environments.

## Requirements

- **Node.js**: Ensure you have Node.js (version 14 or later) installed.
- **PostgreSQL**: A running PostgreSQL server to connect to.
- **Redis**: Optional, for caching (future setup).

## Getting Started

### Installation

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/DmytroKorobkoUA/task-manager-fullstack-app.git
   cd task-manager-fullstack-app
   ```
   
...

-----COMING SOON-----