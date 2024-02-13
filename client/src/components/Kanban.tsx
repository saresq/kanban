import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Task from "../Types";
import KanbanColumn from "./KanbanColumn";
import KanbanModal from "./KanbanModal";

const API_URL = 'http://localhost:5000/api';

function Kanban() {
  const [data, setData] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newState, setNewState] = useState<string>('');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('');
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const fetchData = useCallback(async () => {
    try {
      const result = await axios.get(`${API_URL}/tasks`, {
        params: {
          name: nameFilter,
          state: stateFilter,
          sortField,
          sortOrder
        }
      });
      setData(result.data);
    } catch (e) {
      console.log('Error while fetching data from api endpoint /api/tasks');
    }
  }, [nameFilter, stateFilter, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterTasksByStateAndName = (task: Task) => {
    return (!nameFilter || task.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (!stateFilter || task.state === stateFilter);
  };

  const addNewTask = async () => {
    try {
      await axios.post(`${API_URL}/tasks`, {
        name: newTaskName,
        description: newTaskDescription,
        state: 'Por hacer'
      });
      fetchData();
      setNewTaskName('');
      setNewTaskDescription('');
    } catch (error) {
      console.log('Error while adding new task:', error);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setNewState(task.state);
  };

  const handleEditTask = async () => {
    if (!selectedTask) return;

    try {
      await axios.put(`${API_URL}/tasks/${selectedTask._id}`, {
        name: selectedTask.name,
        description: selectedTask.description,
        state: newState
      });
      fetchData();
      setSelectedTask(null);
    } catch (error) {
      console.log('Error while editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task? This action cannot be undone.");

    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/tasks/${taskId}`);
        fetchData();
      } catch (error) {
        console.log('Error while deleting task:', error);
      }
    }
  };

  const clearFilter = () => {
    setNameFilter('');
    setStateFilter('');
  };

  const clearSort = () => {
    setSortField('');
    setSortOrder('asc');
  };

  const handleSort = (field: string) => {
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
      <div className="mt-6 w-96">
        <input
          type="text"
          placeholder="Task Name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addNewTask}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>
      <div className="flex">
        <div className="w-1/2 mt-6">
          <input
            type="text"
            placeholder="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
        <div className="w-1/2">

          {/* Show active filters */}
          {(nameFilter || stateFilter) && (
            <div className="mt-4 text-center">
              Active Filters:
              {nameFilter && (
                <span className="ml-2 p-3 bg-blue-200 text-blue-800 rounded-full">{`Name: ${nameFilter}`}</span>
              )}
              {stateFilter && (
                <span className="ml-2 p-3 bg-green-200 text-green-800 rounded-full">{`State: ${stateFilter}`}</span>
              )}
              <button
                onClick={clearFilter}
                className="ml-8 px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              >
                Clear Filter
              </button>
            </div>

          )}

          {/* Show sort field and order */}
          {(sortField && sortOrder) && (
            <div className="mt-4 text-center">
              Sorted By:
              {sortField && (
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded">{sortField === 'createdAt' ? 'Creation Date' : 'Name'}</span>
              )}
              {sortOrder && (
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
              )}

              <button
                onClick={clearSort}
                className="ml-8 px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
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
            tasks={sortedData.filter(task => filterTasksByStateAndName(task) && task.state === 'Por hacer')}
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

      {selectedTask && (
        <KanbanModal
          task={selectedTask}
          newState={newState}
          onClose={() => setSelectedTask(null)}
          onSave={handleEditTask}
          onStateChange={(state: string) => setNewState(state)}
        />
      )}

      {/* Sort tasks */}
      <div className="mt-4 text-center">
        Sort By:
        <button className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded" onClick={() => handleSort('name')}>Name</button>
        <button className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded" onClick={() => handleSort('createdAt')}>Creation Date</button>
      </div>
    </>
  );
}

export default Kanban;
