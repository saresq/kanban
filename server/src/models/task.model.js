const mongoose = require('mongoose');

const { Schema } = mongoose;
const { model } = mongoose;

const TaskState = {
  PorHacer: 'Por hacer',
  EnProgreso: 'En progreso',
  Hecho: 'Hecho',
};

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, enum: Object.values(TaskState), required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
});

const Task = model('Task', taskSchema);

module.exports = Task;
