import React from 'react'
import Navbar from './component/Navbar'
import TaskList from './component/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
  <Navbar/>
  <main className="max-w-4xl mx-auto p-4">
    <TaskList/>
  </main>
    </div>
  )
}

export default App
