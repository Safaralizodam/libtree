import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../reducers/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../components/context/ThemeContext';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.login);
  const { isDarkMode } = useTheme(); // Get dark mode state from context

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(postLogin({ userName, password }))
      .unwrap()
      .then(() => {
        navigate('/'); // Redirect to home page on successful login
      });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#333] text-gray-100' : 'bg-gray-100 text-black'}`}>
      <div className={`w-full max-w-md p-8 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'} shadow-md rounded-lg`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-100' : 'text-black'}`}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              htmlFor="username"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-black'}`}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              htmlFor="password"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-black'}`}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-md ${loading ? 'bg-gray-600 cursor-not-allowed' : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-amber-400 hover:bg-amber-500 text-white')}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && (
            <p className={`mt-4 text-center ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} aria-live="assertive">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
