// app/cart.js
'use client';

import { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>Harga: 💲 {item.price}</p>
                  <p>
                    Kuantitas:
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="ml-2 border rounded w-16 text-center"
                    />
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Hapus 🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
