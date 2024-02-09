const Task = require('../models/task.model');

const taskCtrl = {};

taskCtrl.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

taskCtrl.createTask = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const newTask = new Task({
    nombre,
    descripcion,
    estado: 'Por hacer', // Assuming 'Por hacer' is the default state
  });
  try {
    await newTask.save();
    res.send({ message: 'Task created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

taskCtrl.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { nombre, descripcion, estado } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { nombre, descripcion, estado }, { new: true });
    if (updatedTask) {
      res.send({ message: 'Task updated successfully', task: updatedTask });
    } else {
      res.status(404).send({ message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

taskCtrl.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      res.send({ message: 'Task deleted successfully', task: deletedTask });
    } else {
      res.status(404).send({ message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = taskCtrl;
