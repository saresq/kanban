import React from "react";
import { Task } from "../Types";
import TrashIcon from "./icons/TrashIcon";

interface TaskCardProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDeleteTask, onTaskClick }) => {
  const handleCardClick = () => {
    onTaskClick(task);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteTask(task._id);
  };

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <div className="flex items-center justify-between cursor-pointer bg-white/75 hover:bg-white p-5 rounded mb-3" onClick={handleCardClick}>
      <div className="text-black">
        <span className="opacity-50 text-sm">{formatDate(task.created_at)}</span>
        <h1 className="text-xl capitalize mb-4">{task.name}</h1>
        <p>{task.description}</p>
      </div>
      <button className="bg-red-500/75 hover:bg-red-900 p-3 rounded" onClick={handleButtonClick}><TrashIcon /></button>
    </div>
  );
};

export default TaskCard;
