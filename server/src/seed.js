const mongoose = require('mongoose');
const Task = require('./models/task.model');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB using environment variables from Docker Compose
    await mongoose.connect(`mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Uncomment next line if you want to delete all db records before loading dummy data
    // await Task.deleteMany({});

    // Create dummy tasks
    const dummyTasks = [
      { name: 'Mejorar Estilos', description: 'Revisar UI de la plataforma', state: 'Por hacer' },
      { name: 'Drag and Drop', description: 'Evaluar librerias de DnD para futura implementación', state: 'En progreso' },
      { name: 'Completar Challenge', description: 'Realizar todas las tareas requeridas por el challenge', state: 'Hecho' },
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
