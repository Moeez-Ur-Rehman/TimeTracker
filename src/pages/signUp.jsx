import React, { useState,useEffect } from 'react';
import axios from 'axios'; // To send HTTP requests to the backend
import { useNavigate } from 'react-router-dom';

function SignUp({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
   const navigate=useNavigate();
   const apiUrl = process.env.REACT_APP_API_URL
   useEffect(()=>{
    if (localStorage.getItem('authToken') !== null) {
        navigate('/tasks', { replace: true });
      }
},[navigate])
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make POST request to your backend to sign up the user

    console.log("called")
      const response = await axios.post(`${apiUrl}/api/auth/signup`, {
        email,
        password,
      });
      const data = await response.data;
      if(data){
      // Assuming the backend sends a token upon successful login
      const token = data.token;
      console.log("token",token)
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('authToken', token);
      console.log(token);
    //   onSignUp(response.data); // Optional callback to pass data to the parent
      navigate("/tasks");
      }
      else{setError("unsuccesful signup")}
    } catch (err) {
      setError(err.response?.data?.message || 'Sign-up failed'); // Show backend error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up for Task Tracker Lite</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
