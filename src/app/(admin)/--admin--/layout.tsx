'use client'

import { SessionProvider } from 'next-auth/react'
import Aside from './components/aside'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <SessionProvider>
         <main className='mx-4 my-16 md:mx-40'>
            <div className='grid-cols-4 md:grid'>
               <Aside />

               <div className='col-span-3 rounded-xl bg-white p-3 md:p-12'>{children}</div>
            </div>
         </main>
      </SessionProvider>
   )
}
