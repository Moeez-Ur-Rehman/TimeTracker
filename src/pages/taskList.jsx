import React, { useEffect, useState } from 'react';
import AddTask from '../component/addTask';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // To handle API requests
import { MdDelete } from "react-icons/md";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const { data } = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Only run once on component mount

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleAddTask = async (task) => {
    const token = localStorage.getItem('authToken');
    try {
      const { data: newTask } = await axios.post(
        '/api/tasks',
        { title: task.title, dueDate: task.dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const markTaskComplete = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      const { data: updatedTask } = await axios.put(
        `/api/tasks/${id}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === id ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100 flex flex-col items-center md:w-3/4 sm:w-full">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Task Manager</h1>
      </div>

      <AddTask onAdd={handleAddTask} />

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

      <ul className="w-full mt-6 space-y-4 max-w-sm md:max-w-md">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
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
            <div className="flex gap-2">
              {!task.completed ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition duration-300"
                  onClick={() => markTaskComplete(task._id)}
                >
                  Complete
                </button>
              ) : (
                <button
                className="bg-red-500 text-lg hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-300"
                onClick={() => deleteTask(task._id)}
              >
                <MdDelete/>
              </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md mt-10 focus:outline-none transition duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default TaskList;
