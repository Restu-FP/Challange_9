// app/layout.js
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Katalog Online',
  description: 'Katalog E-Commerce Sederhana',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Katalog Online</h1>
          <Link href="/cart">
            <button className="relative">
              🛒
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {/* Jumlah item di keranjang */}
              </span>
            </button>
          </Link>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
