import './globals.css'
import type { Metadata } from 'next'
import "bootstrap/dist/css/bootstrap.css"
import { Inter } from 'next/font/google'
import Header from '@components/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='container'>
          <Header/>
        {children}
        </div>
      </body>
    </html>
  )
}
