# Docker Learning Project

A full-stack web application perfect for learning Docker containerization. This project includes a React frontend and Node.js/Express backend.

## Project Structure

```
docker-learning/
├── frontend/          # React frontend application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/           # Node.js/Express backend API
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

### Frontend (React)
- Modern React application with hooks
- Axios for API communication
- Responsive design with CSS Grid
- Real-time data fetching from backend
- Interactive UI to test backend connectivity

### Backend (Node.js/Express)
- RESTful API with full CRUD operations
- Express.js with security middleware (Helmet, CORS)
- In-memory data store (easily replaceable with database)
- Health check endpoint
- Comprehensive error handling
- Request logging with Morgan

## Quick Start (Without Docker)

### Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will run on http://localhost:3000

### Backend
```bash
cd backend
npm install
npm start
```
Backend will run on http://localhost:5000

## API Endpoints

- `GET /` - API documentation
- `GET /api/data` - Get all items
- `POST /api/data` - Create new item
- `GET /api/data/:id` - Get specific item
- `PUT /api/data/:id` - Update item
- `DELETE /api/data/:id` - Delete item
- `GET /health` - Health check

## Learning Docker with This Project

This project is designed to help you learn Docker concepts:

1. **Containerizing Applications**: Create Dockerfiles for both frontend and backend
2. **Multi-Container Applications**: Use Docker Compose to run both services together
3. **Networking**: Learn how containers communicate with each other
4. **Environment Variables**: Manage configuration across different environments
5. **Volumes**: Persist data and share files between host and containers
6. **Optimization**: Learn about multi-stage builds and image optimization

## Next Steps for Docker Learning

1. Create a `Dockerfile` for the frontend
2. Create a `Dockerfile` for the backend
3. Create a `docker-compose.yml` to orchestrate both services
4. Add environment variables and configuration
5. Implement data persistence with volumes
6. Optimize your Docker images

## Technologies Used

### Frontend
- React 18
- Axios for HTTP requests
- CSS3 with modern layout techniques

### Backend
- Node.js
- Express.js
- Helmet (security)
- CORS
- Morgan (logging)
- Dotenv (environment variables)

Happy Docker Learning! 🐳
