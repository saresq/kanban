import { Request, Response } from 'express';
import Task, { ITask, TaskState } from '../models/task.model';

const taskCtrl: any = {};

taskCtrl.getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

taskCtrl.createTask = async (req: Request, res: Response): Promise<void> => {
  const { nombre, descripcion }: { nombre: string, descripcion: string } = req.body;
  const newTask: ITask = new Task({
    nombre,
    descripcion,
    estado: TaskState.PorHacer,
  });
  try {
    await newTask.save();
    res.send({ message: 'Task created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

taskCtrl.updateTask = async (req: Request, res: Response): Promise<void> => {
  const taskId: string = req.params.id;
  const { nombre, descripcion, estado }: { nombre?: string, descripcion?: string, estado?: TaskState } = req.body;
  try {
    const updatedTask: ITask | null = await Task.findByIdAndUpdate(taskId, { nombre, descripcion, estado }, { new: true });
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

taskCtrl.deleteTask = async (req: Request, res: Response): Promise<void> => {
  const taskId: string = req.params.id;
  try {
    const deletedTask: ITask | null = await Task.findByIdAndDelete(taskId);
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

export default taskCtrl;
