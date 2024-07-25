import React, { useState, useEffect } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/context/ThemeContext';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/login/loginSlice';
import LogoutIcon from '@mui/icons-material/Logout';
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [basketCount, setBasketCount] = useState(0);
  const [user, setUser] = useState({ username: '' });
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    const updateBasketCount = () => {
      const currentBasket = JSON.parse(localStorage.getItem('basketItems')) || [];
      const itemCount = currentBasket.reduce((acc, item) => acc + item.quantity, 0);
      setBasketCount(itemCount);
    };

    updateBasketCount();
    window.addEventListener('storage', updateBasketCount);

    return () => {
      window.removeEventListener('storage', updateBasketCount);
    };
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      const userData = JSON.parse(localStorage.getItem('user')) || { username: '' };
      setUser(userData);
    };

    fetchUser();
  }, [user.username]); // Depend on user.username to re-fetch if it changes

  const isAuthenticated = Boolean(localStorage.getItem('user'));

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user'); // Ensure to clear user data from localStorage
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#333] text-gray-100' : 'bg-gray-100 text-black'}`}>
      <header className={`p-4 flex justify-between items-center ${isDarkMode ? 'bg-[#333]' : ''}`}>
        <div className="container mx-auto flex items-center justify-between mt-[-100px]">
          <Link to="/" className="flex items-center">
            <img
              src="src/assets/img/LIBTREE-removebg-preview.png"
              alt="Logo"
              className="h-16"
            />
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative flex items-center space-x-4">
                 <Link to="/basket" className="relative flex items-center">
              <LocalGroceryStoreIcon style={{ color: isDarkMode ? '' : '#000' }} />
              {basketCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold">
                  {basketCount}
                </div>
              )}
            </Link>
                <div 
                  className="flex items-center cursor-pointer" 
                  onMouseEnter={() => setShowCredentials(true)} 
                  onMouseLeave={() => setShowCredentials(false)}
                >
                  <img 
                    src='https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png' 
                    alt="User Avatar" 
                    className="h-10 w-10 rounded-full border-2 border-gray-700"
                  />
                  {showCredentials && (
                    <div className={`absolute p-2 rounded shadow-lg ${isDarkMode ? 'bg-[#333] text-gray-100' : 'bg-white text-black'}`}>
                      <p>{user.username || 'No Username'}</p> {/* Ensure default text in case of an empty username */}
                    </div>
                  )}
                </div>
                <button 
                  className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
                  onClick={handleLogout}
                >
                 <LogoutIcon/>
                </button>
              </div>
            ) : (
              <button 
                className="mt-4 bg-amber-400 text-xl text-white py-4 px-7 rounded-[17px] mr-[200px]"
                onClick={handleLogin}
              >
                ВОЙТИ
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
