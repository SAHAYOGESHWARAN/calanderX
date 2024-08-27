require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routers = require('./routers'); // Import your routers
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  
  // Start the server only after the database connection is successful
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
  });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: `://localhost:${process.env.CLIENT_PORT}`,
  optionsSuccessStatus: 200,
}));

// Routes
app.use('/api', routers);

// Handle other routes or static files as needed
