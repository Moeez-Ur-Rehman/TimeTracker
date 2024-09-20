import React from 'react';
import route from './routes/route';


function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {route()}
    </div>
  );
}

export default App;
