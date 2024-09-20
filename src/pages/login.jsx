import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate=useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL
  useEffect(()=>{
    if (localStorage.getItem('authToken') !== null) {
        navigate('/tasks', { replace: true });
      }
},[navigate])
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic client-side validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Reset error message
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to backend
      });

      const data = await response.json();
      
      setLoading(false);

      if (!response.ok) {
        // If the backend returns an error, display it
        setError(data.message || 'Error logging in');
        return;
      }

      // Assuming the backend sends a token upon successful login
      const { token } = data;

      // Store the token in localStorage or sessionStorage
      if(token)
        {
        localStorage.setItem('authToken', token);
        console.log(token);
        navigate("/tasks");
        }
      else{
        setError('something is wrong')
      }
      
      // Notify parent component that login was successful
      //onLogin(email);
    } catch (err) {
      setLoading(false);
      setError('Error logging in. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Task Tracker Lite</h2>
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 mb-4"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
