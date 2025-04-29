// app/page.js
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=10')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
          <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
          <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
          <p className="text-green-600 font-bold">💲 {product.price}</p>
          <button
            onClick={() =>
              isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)
            }
            className={`mt-2 w-full py-2 rounded ${
              isInCart(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {isInCart(product.id) ? 'Remove from Cart 🗑️' : 'Add to Cart 🛒'}
          </button>
        </div>
      ))}
    </div>
  );
}
