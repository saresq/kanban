import { useCallback, useEffect, useState } from "react";
import { Task } from "../Types";
import KanbanColumn from "./KanbanColumn";
import Modal from "./Modal";
import { fetchData, addTask, editTask, deleteTask } from "../Api";

function Kanban() {
  const [data, setData] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('');
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const fetchDataAndUpdateState = useCallback(async () => {
    const newData = await fetchData(nameFilter, stateFilter, sortField, sortOrder);
    setData(newData);
  }, [nameFilter, stateFilter, sortField, sortOrder]);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, [fetchDataAndUpdateState]);

  const filterTasksByStateAndName = (task: Task): boolean => {
    return (!nameFilter || task.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!stateFilter || task.state === stateFilter);
  };

  const handleTaskClick = (task: Task): void => {
    setSelectedTask(task);
    setShouldShowModal(true);
  };

  const handleTaskSave = async (name: string, description: string, state: string): Promise<void> => {
    if (!selectedTask) {
      await addTask({ name, description, state });
    } else {
      await editTask(selectedTask._id, { name, description, state });
      setSelectedTask(null);
      setShouldShowModal(false);
    }
    fetchDataAndUpdateState();
  };

  const handleDeleteTask = async (taskId: string): Promise<void> => {
    const confirmDelete = window.confirm("Estas seguro de querer borrar esta tarea? Esta accion no puede deshacerse.");
    if (confirmDelete) {
      await deleteTask(taskId);
      fetchDataAndUpdateState();
    }
  };

  const clearFilter = (): void => {
    setNameFilter('');
    setStateFilter('');
  };

  const clearSort = (): void => {
    setSortField('');
    setSortOrder('asc');
  };

  const handleSort = (field: string): void => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'createdAt') {
      return sortOrder === 'asc' ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <div>
            <h1 className="text-xl">Filtros</h1>
            <input
              type="text"
              placeholder="Filtrar por nombre"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="mr-2 mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="Por hacer">Por hacer</option>
              <option value="En progreso">En progreso</option>
              <option value="Hecho">Hecho</option>
            </select>
          </div>
          <div className="mt-4">
            Ordenar por:
            <button className="ml-2 px-3 py-1 bg-orange-200 text-orange-800 rounded-full" onClick={() => handleSort('name')}>Nombre</button>
            <button className="ml-2 px-3 py-1 bg-orange-200 text-orange-800 rounded-full" onClick={() => handleSort('createdAt')}>Fecha de creacion</button>
          </div>
        </div>
        <div className="w-1/2 flex justify-end items-end flex-col">

          {(nameFilter || stateFilter) && (
            <div className="mt-4 text-right flex">
              Active Filters:
              {nameFilter && (
                <span className="ml-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full">{`Name: ${nameFilter}`}</span>
              )}
              {stateFilter && (
                <span className="ml-2 px-3 py-1 bg-green-200 text-green-800 rounded-full">{`State: ${stateFilter}`}</span>
              )}
              <button
                onClick={clearFilter}
                className="ml-8 px-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              >
                Quitar Filtros
              </button>
            </div>

          )}

          {(sortField && sortOrder) && (
            <div className="mt-4 text-right flex">
              Ordenado Por:
              <span className="ml-2 px-3 py-1 bg-orange-200 text-orange-800 rounded-full">
                {sortField === 'createdAt' ? 'Fecha de creación' : 'Nombre'} &nbsp;
                {sortOrder === 'asc' ? '▲' : '▼'}
              </span>
              <button
                onClick={clearSort}
                className="ml-8 px-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              >
                Quitar Orden
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 w-full text-center">
        <button
          onClick={() => setShouldShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
          Agregar nueva tarea
        </button>
      </div>
      <div className="flex justify-center mt-10 h-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grow select-none">
          <KanbanColumn
            title="Por Hacer"
            tasks={sortedData.filter((task: Task) => filterTasksByStateAndName(task) && task.state === 'Por hacer')}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
          <KanbanColumn
            title="En Progreso"
            tasks={sortedData.filter(task => filterTasksByStateAndName(task) && task.state === 'En progreso')}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
          <KanbanColumn
            title="Hecho"
            tasks={sortedData.filter(task => filterTasksByStateAndName(task) && task.state === 'Hecho')}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>

      {shouldShowModal && (
        <Modal
          task={selectedTask}
          onClose={() => setShouldShowModal(false)}
          onSave={handleTaskSave}
        />
      )}
    </>
  );
}

export default Kanban;
