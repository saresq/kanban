const mongoose = require('mongoose');
const Task = require('./models/task.model');

const seedDatabase = async () => {
    try {
    // Connect to MongoDB using environment variables from Docker Compose
    await mongoose.connect(`mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Remove existing tasks
    await Task.deleteMany({});

    // Create dummy tasks
    const dummyTasks = [
        { nombre: 'Task 1', descripcion: 'Description 1', estado: 'Por hacer' },
        { nombre: 'Task 2', descripcion: 'Description 2', estado: 'En progreso' },
        { nombre: 'Task 3', descripcion: 'Description 3', estado: 'Hecho' },
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
