import React, { useState, useEffect } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/context/ThemeContext'; 
import { useDispatch, useSelector } from 'react-redux';
import { getlist } from '../reducers/booklist/bookListSlice'; 

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 
  const data = useSelector((store) => store.bookList.data || []);
  const [basketCount, setBasketCount] = useState(0);
  const [user, setUser] = useState({ username: '' });
  const [showCredentials, setShowCredentials] = useState(false);

  // Effect to handle basket count updates
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

  // Effect to fetch user and authenticate status
  useEffect(() => {
    const fetchUser = () => {
      const userData = JSON.parse(localStorage.getItem('user')) || { username: '' };
      setUser(userData);
    };

    fetchUser();
  }, []);

  // Check authentication status
  const isAuthenticated = Boolean(localStorage.getItem('user'));

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: isDarkMode ? '#333' : '#f5f5f5', color: isDarkMode ? '#fff' : '#000' }}>
      <header className="p-4 flex justify-between items-center" style={{ backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }}>
        <div className="flex items-center justify-between w-[95%] m-auto">
          <div className="flex flex-col-reverse w-[70%]">
            <Link to="/" className="flex items-center">
              <img
                src="src/assets/img/LIBTREE-removebg-preview.png" 
                alt="Logo"
                className="h-[70px]"
              />
            </Link>
          </div>
          <div className="w-[25%] mb-[20px] m-auto text-center">
            {!isAuthenticated ? (
              <button className="mt-4 bg-amber-400 text-xl text-white py-4 px-7 rounded-[17px]" onClick={handleLogin}>ВОЙТИ</button>
            ) : (
              <div className="flex items-center">
                <Link to="/basket">
                  <div className="flex items-center relative">
                    <LocalGroceryStoreIcon style={{ color: isDarkMode ? '#fff' : '#000' }} />
                    {basketCount > 0 && (
                      <div className="h-[15px] w-[15px] p-[10px] rounded-full bg-green-500 text-white absolute -top-4 -right-4 flex items-center justify-center">
                        {basketCount}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="ml-4 flex items-center" onMouseEnter={() => setShowCredentials(true)} onMouseLeave={() => setShowCredentials(false)}>
                  <img src='https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png' alt="User Avatar" className="h-10 w-10 rounded-full" />
                  {showCredentials && (
                    <div className="ml-2">
                      <p>{user.username}</p>
                    </div>
                  )}
                </div>
                <button className="ml-4 bg-red-500 text-white py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
