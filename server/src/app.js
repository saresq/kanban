const express = require('express');
const cors = require('cors');

const app = express();

// Settings
app.set('port', process.env.PORT);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/tasks', require('./routes/tasks'));

module.exports = app;
