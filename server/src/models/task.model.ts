import { Schema, Document, model, Model } from 'mongoose';

export enum TaskState {
  PorHacer = 'Por hacer',
  EnProgreso = 'En progreso',
  Hecho = 'Hecho',
}

export interface ITask extends Document {
  nombre: string;
  descripcion: string;
  estado: TaskState;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

const taskSchema: Schema<ITask> = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { type: String, enum: Object.values(TaskState), required: true },
  fecha_creacion: { type: Date, default: Date.now, required: true },
  fecha_actualizacion: { type: Date, default: Date.now, required: true },
});

const Task: Model<ITask> = model<ITask>('Task', taskSchema);

export default Task;
