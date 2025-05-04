'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then((res) => res.json())
      .then((data) => {
        const withQuantity = data.products.map((item) => ({ ...item, quantity: 1 }));
        setProducts(withQuantity);
      });
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">🛍️ Katalog Produk</h1>
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-8 h-8 text-indigo-600" />
          <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1">
            {cartItems.length}
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-indigo-100">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-lg font-bold text-indigo-800 line-clamp-1">{product.title}</h2>
            <p className="text-pink-600 font-semibold">💲 {product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <button
              disabled={product.stock === 0}
              onClick={() => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product)}
              className={`mt-3 w-full py-2 rounded-lg text-sm font-medium flex justify-center items-center gap-2
                transition duration-300 ease-in-out
                ${product.stock === 0
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : isInCart(product.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90'
                }`}
            >
              {isInCart(product.id) ? 'Remove from Cart 🗑️' : 'Add to Cart 🛒'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
