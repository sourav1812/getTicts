import './globals.css'
import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '@components/header'
import getCurrentUser from 'api/user';
export const dynamic = 'force-dynamic'
export const revalidate = 10; //revalidate every 1hr seconds

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const {currentUser}:any = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <div className='container'>
        <Header 
          currentUser={currentUser}
          // id={id}
          />
        {children}
        </div>
      </body>
    </html>
  )
}
