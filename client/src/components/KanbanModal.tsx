import React, { useEffect, useState } from "react";
import Task from "../Types";
import CloseIcon from "./icons/CloseIcon";

interface KanbanModalProps {
  task: Task | null;
  onClose: () => void;
  onSave: (name: string, description: string, state: string) => void;
}

const KanbanModal: React.FC<KanbanModalProps> = ({ task, onClose, onSave }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setState(task.state);
    } else {
      setName('');
      setDescription('');
    }
  }, [task]);

  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [onClose]);

  const handleSave = () => {
    onSave(name, description, state);
    onClose();
  };

  const mode = task ? 'EDIT' : 'CREATE';

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-gray-800 p-6 py-9 flex flex-col w-[32rem] rounded shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          <CloseIcon />
        </button>
        <h1 className="text-2xl mb-6">{mode === "EDIT" ? 'Editando Tarea' : 'Creando Nueva Tarea'}</h1>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-6"
        />
        <label>Descripción:</label>
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-6"
        />
        {mode === "EDIT" &&
          <>
            <label>Estado:</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-6"
            >
              <option value="Por hacer">Por hacer</option>
              <option value="En progreso">En progreso</option>
              <option value="Hecho">Hecho</option>
            </select>
          </>
        }
        <div className="flex items-center justify-center mt-9">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 mr-2"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanModal;
