import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './protectedRoutes'; // Adjust this path if needed
import Login from '../pages/login';
import TaskList from '../pages/taskList';
import SignUp from '../pages/signUp';
import Home from '../pages/home';
import Navbar from '../component/Header';
const RouteConfig = () => {
  return (
    <>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default RouteConfig;
