import React, { useEffect, useState } from 'react';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    setBasketItems(savedItems);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedItems = basketItems.filter(item => item.id !== id);
    setBasketItems(updatedItems);
    localStorage.setItem('basketItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"></h1>
      {basketItems.length === 0 ? (
        <p></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {basketItems.map(item => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={item.avatar} alt={item.name} className="w-full h-[330px] rounded-t-lg object-cover" />
              <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
              <p className="text-gray-600">{item.fullname}</p>
              <p className="text-gray-800 font-bold pt-4">{item.price}</p>
              <p className="text-gray-600 pt-2">Quantity: {item.quantity}</p>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
