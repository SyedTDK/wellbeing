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
        <body className={`${inter.className}`}>
          {children}
        </body>
      </html>
      </AuthProvider>
  );
}
