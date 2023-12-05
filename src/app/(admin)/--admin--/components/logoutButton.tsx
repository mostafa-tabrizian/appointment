'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
   const [loading, setLoading] = useState(false)

   const handleLogout = () => {
      setLoading(true)
      signOut({ callbackUrl: '/' })
   }

   return (
      <div className='flex items-center shadow shadow-blue-700/10 transition-all hover:cursor-pointer hover:shadow-lg hover:shadow-blue-100'>
         {loading ? (
            <div className='mx-auto flex py-3'>
               <svg
                  className='h-7 w-7 animate-spin text-blue-600'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
               >
                  <circle
                     className='opacity-25'
                     cx='12'
                     cy='12'
                     r='10'
                     stroke='currentColor'
                     strokeWidth='4'
                  ></circle>
                  <path
                     className='opacity-75'
                     fill='currentColor'
                     d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
               </svg>
            </div>
         ) : (
            <button disabled={loading} onClick={handleLogout}>
               <div className='mr-1 flex items-center'>
                  <svg
                     className='ml-3 h-7 w-7'
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     strokeWidth='1'
                     stroke='currentColor'
                     fill='none'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     {' '}
                     <path stroke='none' d='M0 0h24v24H0z' />{' '}
                     <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />{' '}
                     <path d='M7 12h14l-3 -3m0 6l3 -3' />
                  </svg>
                  <span className='text-base font-normal text-inherit'>خروج</span>
               </div>
            </button>
         )}
      </div>
   )
}

export default LogoutButton
