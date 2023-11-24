import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Well Being',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'${inter.className}  text-slate-100 container mx-auto p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}>{children}</body>
    </html>
  )
}
