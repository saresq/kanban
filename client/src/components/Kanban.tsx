import { useCallback, useEffect, useState } from "react";
import Task from "../Types";
import KanbanColumn from "./KanbanColumn";
import KanbanModal from "./KanbanModal";
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
    const confirmDelete = window.confirm("Are you sure you want to delete this task? This action cannot be undone.");
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
        <div className="w-1/2 mt-6">
          <div>
            <h1 className="text-xl">Filters</h1>
            <input
              type="text"
              placeholder="Filter by Name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="mr-2 mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">All States</option>
              <option value="Por hacer">Por hacer</option>
              <option value="En progreso">En progreso</option>
              <option value="Hecho">Hecho</option>
            </select>
          </div>
          <div className="mt-4">
            Sort By:
            <button className="ml-2 px-3 py-1 bg-orange-200 text-orange-800 rounded-full" onClick={() => handleSort('name')}>Name</button>
            <button className="ml-2 px-3 py-1 bg-orange-200 text-orange-800 rounded-full" onClick={() => handleSort('createdAt')}>Creation Date</button>
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
                Clear Filters
              </button>
            </div>

          )}

          {(sortField && sortOrder) && (
            <div className="mt-4 text-right flex">
              Sorted By:
              <span className="ml-2 px-3 py-1 bg-orange-200 text-orange-800 rounded-full">
                {sortField === 'createdAt' ? 'Creation Date' : 'Name'} &nbsp;
                {sortOrder === 'asc' ? '▲' : '▼'}
              </span>
              <button
                onClick={clearSort}
                className="ml-8 px-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              >
                Clear Sort
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10 h-auto w-full">
        <div className="grid grid-cols-3 gap-4 grow">
          <KanbanColumn
            title="TODO"
            tasks={sortedData.filter((task: Task) => filterTasksByStateAndName(task) && task.state === 'Por hacer')}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
          <KanbanColumn
            title="IN PROGRESS"
            tasks={sortedData.filter(task => filterTasksByStateAndName(task) && task.state === 'En progreso')}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
          <KanbanColumn
            title="DONE"
            tasks={sortedData.filter(task => filterTasksByStateAndName(task) && task.state === 'Hecho')}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>
      <div className="mt-6 w-full text-center">
        <button
          onClick={() => setShouldShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>

      {shouldShowModal && (
        <KanbanModal
          task={selectedTask}
          onClose={() => setShouldShowModal(false)}
          onSave={handleTaskSave}
        />
      )}
    </>
  );
}

export default Kanban;
