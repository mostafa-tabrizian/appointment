'use client'

import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './logoutButton'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Aside = () => {
   const pathname = usePathname()
   const [show, setShow] = useState(false)

   useEffect(() => {
      setShow(false)

      return () => {
         setShow(false)
      }
   }, [pathname])

   return (
      <>
         <button
            onClick={() => setShow((prev) => !prev)}
            className='absolute right-0 top-0 z-10 rounded-xl p-2 backdrop-blur-md md:hidden'
         >
            {show ? (
               <svg
                  className='h-14 w-14 text-blue-500'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
               >
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />{' '}
                  <line x1='6' y1='6' x2='18' y2='18' />
               </svg>
            ) : (
               <svg
                  className='h-14 w-14 text-blue-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                     d='M4 6h16M4 12h16m-7 6h7'
                  />
               </svg>
            )}
         </button>
         <div className='relative z-10'>
            <div
               className={`md:bd-inherit fixed right-6 top-16 w-fit rounded-xl bg-white p-4 shadow-lg transition-transform duration-500 ease-in-out md:right-auto md:top-auto md:translate-x-0 md:bg-transparent md:shadow-none ${
                  show ? 'translate-x-0' : 'translate-x-[110%]'
               }`}
            >
               <div className='relative aspect-video w-60'>
                  <Link href='/'>
                     <Image alt='logo' priority src='/logo-color.svg' fill />
                  </Link>
               </div>
               <div className='mt-10 w-60 space-y-4'>
                  <Link
                     className={` ${
                        pathname.includes('appointments')
                           ? ' bg-gradient-to-tl from-[#568deb] to-blue-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-blue-700/10 transition-shadow hover:shadow-lg hover:shadow-blue-100`}
                     href='/--admin--/appointments'
                  >
                     <svg
                        className='h-7 w-7'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1'
                        stroke='currentColor'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='1'
                           d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                        />
                     </svg>
                     <span className='text-base font-normal text-inherit'>رزرو ها</span>
                  </Link>

                  <Link
                     className={` ${
                        pathname.includes('workingDays')
                           ? ' bg-gradient-to-tl from-[#568deb] to-blue-300 text-white'
                           : ''
                     } flex h-10 items-center gap-x-2.5 rounded-lg px-3 shadow shadow-blue-700/10 transition-shadow hover:shadow-lg hover:shadow-blue-100`}
                     href='/--admin--/workingDays'
                  >
                     <svg
                        className='h-7 w-7'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                     >
                        {' '}
                        <circle cx='12' cy='12' r='10' /> <polyline points='12 6 12 12 16 14' />
                     </svg>
                     <span className='text-base font-normal text-inherit'>ساعت کاری</span>
                  </Link>

                  <LogoutButton />
               </div>
            </div>
         </div>
      </>
   )
}

export default Aside
