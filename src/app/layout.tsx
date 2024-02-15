// This is the root layout for the app. It wraps all pages and components.

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import  AuthProvider  from './context/AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Well Being',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.className} text-slate-100 container mx-auto p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>
          {children}
          <footer className="bg-gray-800 rounded-lg shadow m-4">
              <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                  <span className="text-sm sm:text-center text-gray-400">© 2023 WellBeing™. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
              </div>
          </footer>
        </body>
      </html>
      </AuthProvider>
  );
}
