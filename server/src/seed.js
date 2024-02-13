const mongoose = require('mongoose');
const Task = require('./models/task.model');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB using environment variables from Docker Compose
    await mongoose.connect(`mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Remove existing tasks
    await Task.deleteMany({});

    // Create dummy tasks
    const dummyTasks = [
      { name: 'Task 1', description: 'Description 1', state: 'Por hacer' },
      { name: 'Task 2', description: 'Description 2', state: 'En progreso' },
      { name: 'Task 3', description: 'Description 3', state: 'Hecho' },
    ];

    // Insert dummy tasks into the database
    await Task.insertMany(dummyTasks);

    console.log('Dummy data seeded successfully');
  } catch (error) {
    console.error('Error seeding dummy data:', error);
    process.exit(1);
  }
};

module.exports = seedDatabase;
