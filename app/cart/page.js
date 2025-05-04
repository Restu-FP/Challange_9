'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(savedItems);
    };

    syncCart();
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  const updateQuantity = (productId, quantity, stock) => {
    // Ensure quantity stays within valid range
    if (quantity >= 1 && quantity <= stock) {
      const updated = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      setCartItems(updated);
      localStorage.setItem('cartItems', JSON.stringify(updated));
    }
  };

  const increment = (id, currentQty, stock) => {
    // Increase quantity if it's less than stock
    if (currentQty < stock) updateQuantity(id, currentQty + 1, stock);
  };

  const decrement = (id, currentQty) => {
    // Decrease quantity but ensure it's at least 1
    if (currentQty > 1) updateQuantity(id, currentQty - 1);
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <Link href="/" className="text-indigo-600 underline">← Kembali ke Katalog</Link>
      <h2 className="text-3xl font-bold mb-6 text-pink-600">🛒 Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Keranjang kosong.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center bg-indigo-50 p-4 rounded-lg shadow border border-indigo-100">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-semibold text-lg text-indigo-800">{item.title}</h3>
                  <p>Harga: 💲{item.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => decrement(item.id, item.quantity)}
                      className="px-2 py-1 bg-indigo-200 rounded hover:bg-indigo-300"
                    >−</button>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value), item.stock)
                      }
                      className="w-14 text-center border rounded"
                    />
                    <button
                      onClick={() => increment(item.id, item.quantity, item.stock)}
                      className="px-2 py-1 bg-indigo-200 rounded hover:bg-indigo-300"
                    >+</button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Hapus 🗑️
              </button>
            </div>
          ))}
          <div className="text-right font-bold text-xl text-indigo-700">
            Total: 💲{totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </main>
  );
}
