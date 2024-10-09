require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const authRoutes = require('./routes/auth'); // Import authentication routes
 // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
connectDB(); // Connect to MongoDB using the connectDB function from db.js

// Routes
app.use('/api/auth', authRoutes); // Define authentication routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
