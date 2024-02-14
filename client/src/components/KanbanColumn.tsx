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
  let borderColor = '';

  switch (title.toLowerCase()) {
    case 'por hacer':
      borderColor = 'border-blue-500';
      break;
    case 'en progreso':
      borderColor = 'border-yellow-500';
      break;
    case 'hecho':
      borderColor = 'border-green-500';
      break;
  }

  return (
    <div className={`${borderColor} bg-neutral-700 p-4 border-t-8 min-h-64 rounded`}>
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
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
