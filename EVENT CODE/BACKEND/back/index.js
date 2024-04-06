// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

// Create an instance of Express
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Establish connection to MongoDB
const url = "mongodb+srv://rithvik:rithvik@event.eovstts.mongodb.net/?retryWrites=true&w=majority";
const dbName = "test"; // Replace with your database name
mongodb.MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('MongoDB connected successfully');
    const db = client.db(dbName);
    
    // Pass the database connection to routes
    app.use('/api', require('./routes/roomRoutes')(db)); // Pass db connection to roomRoutes
    app.use('/api', require('./routes/studentRoutes')(db)); // Pass db connection to studentRoutes
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server
const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
