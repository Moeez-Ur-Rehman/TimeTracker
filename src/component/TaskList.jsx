import { useState } from 'react';
import AddTask from './AddTask';
import { v4 as uuidv4 } from 'uuid'; // For unique task ids

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddTask = (task) => {
    const newTask = { 
      id: uuidv4(), 
      title: task.title, 
      dueDate: task.dueDate, 
      completed: false, 
      completedAt: null 
    };
    setTasks([...tasks, newTask]);
  };

  const markTaskComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id 
        ? { 
            ...task, 
            completed: true, 
            completedAt: new Date().toLocaleString() 
          } 
        : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100 flex flex-col items-center md:w-3/4 sm:w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Task Manager</h1>

      {/* Add Task Form */}
      <AddTask onAdd={handleAddTask} />

      {/* Dropdown Menu */}
      <div className="relative inline-block text-left mt-4 w-full max-w-sm md:max-w-md">
        <button
          onClick={toggleDropdown}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md focus:outline-none transition duration-300"
        >
          {filter === 'all' ? 'All Tasks' : filter === 'completed' ? 'Completed Tasks' : 'Incomplete Tasks'}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li>
                <button
                  onClick={() => handleFilterChange('all')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  All
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterChange('completed')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Completed
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterChange('incomplete')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Incomplete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Task List */}
      <ul className="w-full mt-6 space-y-4 max-w-sm md:max-w-md">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-white rounded-md shadow-md flex justify-between items-center border border-gray-200"
          >
            <div className="flex flex-col">
              <span className={`${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'} break-words`}>
                {task.title}
              </span>
              <span className="text-sm text-gray-500">Due date: {task.dueDate}</span>
              {task.completed && task.completedAt && (
                <span className="text-xs text-gray-400">Completed at: {task.completedAt}</span>
              )}
            </div>
            {!task.completed ? (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition duration-300"
                onClick={() => markTaskComplete(task.id)}
              >
                Complete
              </button>
            ) : (
              <span className="ml-4 text-green-500 text-xl">✔</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
