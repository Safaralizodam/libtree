import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useNavigate } from 'react-router-dom';
import { getlist } from '../../reducers/booklist/bookListSlice';
import { TextField, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '18px',
  backgroundColor: theme.palette.background.default,
  padding: '11px 25px',
  width: '100%',
  marginLeft: '170px',
  marginTop: '-120px',
  marginBottom: '30px',
  maxWidth: '900px',
}));

const BookList = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.bookList.data);

  const [basketItems, setBasketItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getlist());
    const storedBasket = JSON.parse(localStorage.getItem('basketItems')) || [];
    setBasketItems(storedBasket);
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleCardClick = (id) => {
    navigate(`book/${id}`);
  };

  const handleAddToBasketClick = (event, item) => {
    event.stopPropagation();

    const currentBasket = JSON.parse(localStorage.getItem('basketItems')) || [];
    const existingItem = currentBasket.find(basketItem => basketItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentBasket.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('basketItems', JSON.stringify(currentBasket));
    setBasketItems(currentBasket);
  };

  const isItemInBasket = (itemId) => {
    return basketItems.some(item => item.id === itemId);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter(el =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const textFieldStyles = useMemo(() => ({
    width: '100%',
    backgroundColor: isDarkMode ? '#444' : '',
    '& .MuiInputBase-input': {
      color: isDarkMode ? '#aaa' : '#444',
    },
    '& .MuiInputBase-input::placeholder': {
      color: isDarkMode ? '#aaa' : '#888', 
    }
  }), [isDarkMode]);

  const iconButtonStyles = useMemo(() => ({
    color: isDarkMode ? '#fff' : '#000'
  }), [isDarkMode]);

  return (
    <div className="p-6">
      <Search>
        <TextField
          variant="standard"
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          sx={textFieldStyles}
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton onClick={handleSearch} style={iconButtonStyles}>
          <SearchIcon />
        </IconButton>
      </Search>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pt-[50px]">
        {filteredData.map((el) => (
          <div
            key={el.id}
            className="bg-white shadow-lg rounded-lg cursor-pointer"
            onClick={() => handleCardClick(el.id)}
          >
            <img src={el.avatar} alt={el.name} className="w-full h-[370px] rounded-t-lg object-cover" />
            <div className='p-6'>
              <h2 className="text-xl font-semibold mt-4 text-gray-600">{el.name}</h2>
              <p className="text-gray-600">{el.fullname}</p>
              <div className='flex items-center justify-between'>
                <p className="text-gray-800 font-bold pt-4">{el.price}</p>
                <button
                  className={`mt-4 py-2 px-4 rounded-[29px] ${isItemInBasket(el.id) ? 'bg-green-500' : 'bg-amber-400'} text-white`}
                  onClick={(event) => handleAddToBasketClick(event, el)}
                >
                  <LocalGroceryStoreIcon /> {isItemInBasket(el.id) ? 'В корзине' : 'В корзину'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
