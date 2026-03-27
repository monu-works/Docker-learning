const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// In-memory data store (for simplicity - in real app you'd use a database)
let dataStore = [
  {
    id: 1,
    title: 'Welcome to Docker Backend!',
    description: 'This is a sample item from the backend API',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Docker is Awesome',
    description: 'Containerization makes deployment so much easier',
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Docker Learning Backend API is running!',
    version: '1.0.0',
    endpoints: {
      'GET /api/data': 'Get all items',
      'POST /api/data': 'Create new item',
      'GET /api/data/:id': 'Get specific item',
      'PUT /api/data/:id': 'Update item',
      'DELETE /api/data/:id': 'Delete item'
    }
  });
});

app.get('/api/data', (req, res) => {
  res.json(dataStore);
});

app.post('/api/data', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({
      error: 'Title and description are required'
    });
  }

  const newItem = {
    id: nextId++,
    title,
    description,
    createdAt: new Date().toISOString()
  };

  dataStore.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = dataStore.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  
  const itemIndex = dataStore.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  if (title) dataStore[itemIndex].title = title;
  if (description) dataStore[itemIndex].description = description;
  dataStore[itemIndex].updatedAt = new Date().toISOString();
  
  res.json(dataStore[itemIndex]);
});

app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = dataStore.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = dataStore.splice(itemIndex, 1);
  res.json({ message: 'Item deleted successfully', item: deletedItem[0] });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API documentation: http://localhost:${PORT}/`);
});

module.exports = app;
