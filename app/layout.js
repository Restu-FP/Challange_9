import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Webstore Katalog",
  description: "Toko online sederhana dengan fitur keranjang belanja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-white via-indigo-50 to-pink-50 text-gray-800 antialiased`}>
        <header className="bg-white shadow-md py-4 px-6 mb-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-indigo-700">🛒 Toko Online</h1>
          </div>
        </header>
        {children}
        <footer className="mt-12 text-center text-sm text-gray-500 py-6 border-t border-gray-200">
          © {new Date().getFullYear()} Toko Online. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
