import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <header className="bg-blue-600 text-white py-4 text-center">
          <Link to='/'>
          <h1 className="text-2xl font-bold">Task Tracker Lite</h1>
          </Link>
        </header>
      );
}

export default Navbar
