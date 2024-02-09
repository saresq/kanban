const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const TaskState = {
  PorHacer: 'Por hacer',
  EnProgreso: 'En progreso',
  Hecho: 'Hecho',
};

const taskSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: Object.values(TaskState), required: true },
  fecha_creacion: { type: Date, default: Date.now, required: true },
  fecha_actualizacion: { type: Date, default: Date.now, required: true },
});

const Task = model('Task', taskSchema);

module.exports = Task;
