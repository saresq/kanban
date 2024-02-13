// api.ts
import axios, { AxiosResponse } from "axios";

const API_URL = 'http://localhost:5000/api';

interface Task {
  _id: string;
  name: string;
  description: string;
  state: "Por hacer" | "En progreso" | "Hecho";
  created_at: Date;
}

interface NewTask {
  name: string;
  description: string;
  state: string;
}

export const fetchData = async (nameFilter: string, stateFilter: string, sortField: string, sortOrder: string): Promise<Task[]> => {
  try {
    const result: AxiosResponse<Task[]> = await axios.get(`${API_URL}/tasks`, {
      params: {
        name: nameFilter,
        state: stateFilter,
        sortField,
        sortOrder
      }
    });
    return result.data;
  } catch (e) {
    console.log('Error while fetching data from api endpoint /api/tasks');
    return [];
  }
};

export const addTask = async (newTask: NewTask): Promise<void> => {
  try {
    await axios.post(`${API_URL}/tasks`, newTask);
  } catch (error) {
    console.log('Error while adding new task:', error);
  }
};

export const editTask = async (taskId: string, updatedTask: NewTask): Promise<void> => {
  try {
    await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
  } catch (error) {
    console.log('Error while editing task:', error);
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {

  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  } catch (error) {
    console.log('Error while deleting task:', error);
  }
};
