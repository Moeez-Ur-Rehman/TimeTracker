import { useState } from 'react';
import AddTask from './AddTask';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddTask = (taskTitle) => {
    const newTask = { title: taskTitle, completed: false };
    setTasks([...tasks, newTask]);
  };

  const markTaskComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    return true; // show all tasks
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div>
      <AddTask onAdd={handleAddTask} />

      {/* Dropdown Menu */}
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {filter === 'all' ? 'All Tasks' : filter === 'completed' ? 'Completed Tasks' : 'Incomplete Tasks'}
        </button>

        {isOpen && (
          <div className="absolute  mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
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
              
            </ul>
          </div>
        )}
      </div>

      {/* Task List */}
      <ul className="mt-4">
        {filteredTasks.map((task, index) => (
          <li key={index} className="p-2 border flex items-center">
            <span className={`${task.completed ? 'text-gray-500' : ''}`}>
              {task.title}
            </span>
            {!task.completed ? (
              <button
                className="ml-4 bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => markTaskComplete(index)}
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
