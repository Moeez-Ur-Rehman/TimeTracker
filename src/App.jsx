import React, { useState } from 'react';

import Navbar from './component/Navbar';
import TaskList from './component/TaskList';
import Login from './component/Login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
      
        {isLoggedIn ? (
          <div>
            
             {/*<h2 className="text-2xl font-bold mb-4">Welcome, {userEmail}!</h2>*/}
            <TaskList />
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;
