const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configure CORS: allow the client origin in production (set CLIENT_ORIGIN)
const clientOrigin = process.env.CLIENT_ORIGIN || '*';
app.use(cors({
  origin: clientOrigin,
  credentials: true,
}));

// Example health route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// TODO: mount your real API routes here
// const users = require('./routes/users');
// app.use('/api/users', users);

// Optional: serve client build if you ever want a single deploy.
// Set SERVE_CLIENT=true and ensure client build is at ./client/build
if (process.env.SERVE_CLIENT === 'true') {
  const path = require('path');
  const staticPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable. See .env.example');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });