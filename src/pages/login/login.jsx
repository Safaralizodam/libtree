import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../reducers/login/loginSlice'; 

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.login);

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(postLogin({ userName, password }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-90px]">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label 
                            className="block text-gray-700 text-sm font-medium mb-2" 
                            htmlFor="username"
                        >
                            Username:
                        </label>
                        <input 
                            id="username"
                            type="text" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-required="true"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label 
                            className="block text-gray-700 text-sm font-medium mb-2" 
                            htmlFor="password"
                        >
                            Password:
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:bg-amber-400"
                            aria-required="true"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full py-2 px-4 font-semibold text-white rounded-md ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-amber-400 hover:bg-amber-500 focus:ring-2 focus:bg-amber-500'}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && (
                        <p className="mt-4 text-red-500 text-center" aria-live="assertive">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;
