import React ,{useEffect}from 'react';
import { Link,useNavigate } from 'react-router-dom';
const Home = () => {
    const  navigate=useNavigate()
    useEffect(()=>{
        if (localStorage.getItem('authToken') !== null) {
            navigate('/tasks', { replace: true });
          }
    },[navigate])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-4">Welcome to Task Tracker Lite</h2>
      <p className="text-lg text-gray-700 mb-8">
        Track your tasks efficiently with a simple and intuitive interface.
      </p>
      <div className="flex space-x-4">
        <Link to="/signup" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Get Started
        </Link>
        <Link to="/login" className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
