const express = require('express');
const cors = require('cors');
const seedDatabase = require('./seed');

const app = express();

// Settings
app.set('port', process.env.PORT);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/tasks', require('./routes/tasks'));

// Call the seedDatabase function -- Comment this block to stop seeding db on next runs
(async () => {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
})();

module.exports = app;
