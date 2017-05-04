const mongoose = require('mongoose');
let mongoDB;
if (process.env.NODE_ENV === 'test') {
  mongoDB = 'mongodb://127.0.0.1/test';
} else {
  mongoDB = 'mongodb://127.0.0.1/dev';
}

// Set up connection to mongo default test database
mongoose.connect(mongoDB);
const db = mongoose.connection;

// Handle db connection errors
db.on('error', () => console.error('MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB', db.name));

require('../models/user');
