import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getlist } from '../../reducers/booklist//bookListSlice'; 

const BookInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const data = useSelector((store) => store.bookList.data);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    dispatch(getlist());
    const storedBasket = JSON.parse(localStorage.getItem('basketItems')) || [];
    setBasketItems(storedBasket);
  }, [dispatch]);

  useEffect(() => {
    const selectedBook = data.find((book) => book.id === id);
    setBook(selectedBook);
  }, [id, data]);

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

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className=" bg-gray-200 shadow-lg rounded-lg p-6 flex">
        <div className='w-[30%]'>
          <img src={book.avatar} alt={book.name} className="w-full h-[520px] rounded-t-lg" />
        </div>
        <div className='w-[70%] p-[30px] leading-[50px]'>
          <h1 className=" text-gray-900 text-2xl font-semibold mt-4">{book.name}</h1>
          <p className="text-gray-600">{book.fullname}</p>
          <p className="text-gray-800 font-bold pt-4">{book.price}</p>
          <p className="text-gray-600 mt-4 leading-[28px]">{book.title}</p>
          <button
            className={`mt-[50px] py-2 px-[30px] rounded-[29px] ${isItemInBasket(book.id) ? 'bg-green-500 text-white' : 'bg-amber-400 text-white'}`}
            onClick={(event) => handleAddToBasketClick(event, book)}
          >
            {isItemInBasket(book.id) ? 'В корзине  ' : 'В корзину  '}   {book.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
