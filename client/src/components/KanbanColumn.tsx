// KanbanColumn.tsx
import React from "react";
import { Task } from "../Types";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, onDeleteTask, onTaskClick }) => {
  let bgColorClass = '';

  switch (title.toLowerCase()) {
    case 'todo':
      bgColorClass = 'bg-blue-800';
      break;
    case 'in progress':
      bgColorClass = 'bg-yellow-600';
      break;
    case 'done':
      bgColorClass = 'bg-green-800';
      break;
    default:
      bgColorClass = 'bg-gray-800';
  }

  return (
    <div className={`${bgColorClass} p-4 min-h-64 rounded`}>
      <h2 className="text-2xl font-semibold text-white mb-4 opacity-75">{title}</h2>
      {tasks.length === 0 &&
        <div className="text-center italic mt-9"> No hay tareas en este estado </div>
      }
      {tasks.map((task: Task) => (
        <TaskCard key={task._id} task={task} onDeleteTask={onDeleteTask} onTaskClick={onTaskClick} />
      ))}
    </div>
  );
};

export default KanbanColumn;
