'use client'

import LogoutButton from './logout.button'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import { useState } from 'react'
import Link from 'next/link'

interface IUser {
   mobileNumber: string | undefined
   name: string | undefined
   avatar: string | undefined
}

const Profile = ({ user }: { user: IUser }) => {
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const open = Boolean(anchorEl)
   const id = open ? 'simple-popover' : undefined

   return (
      <>
         <button onClick={handleClick} className='border rounded-2xl p-1.5'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               viewBox='0 0 24 24'
               fill='none'
               className='w-6 h-6 text-gray-700'
            >
               <g
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  clipPath='url(#account_svg__a)'
               >
                  <path d='M12 13.8c3.06 0 5.54-2.42 5.54-5.4C17.54 5.42 15.06 3 12 3S6.46 5.42 6.46 8.4c0 2.98 2.48 5.4 5.54 5.4ZM6 21c2.69-4.42 9.24-4.44 11.97-.05L18 21'></path>
               </g>
               <defs>
                  <clipPath id='account_svg__a'>
                     <path fill='#fff' d='M0 0h24v24H0z'></path>
                  </clipPath>
               </defs>
            </svg>
         </button>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            sx={{ marginTop: '.5rem' }}
         >
            <ul className='rtl p-4 w-[250px]'>
               <li className='cursor-default flex gap-4 items-center mb-1 rounded-lg py-1 px-2'>
                  <Avatar
                     sx={{
                        width: 46,
                        height: 46,
                        border: '2px solid white',
                        boxShadow: '0 0 10px #8080805c',
                     }}
                     alt={user.name}
                     src={'/avatar/' + user.avatar}
                  />
                  <div className='text-sm w-full flex flex-col h-full justify-between text-skin-base'>
                     <span className='font-bold block mb-1'>{user.name}</span>
                     <span className='font-bold block'>{user.mobileNumber}</span>
                  </div>
               </li>
               <hr />
               <li
                  className='rounded-lg py-1 px-4 hover:bg-gray-100 transition-all duration-300 ease-out mb-1'
                  role='menuitem'
               >
                  <Link className='block w-full' href='/profile'>
                     <div className='flex py-2 text-skin-base hover:text-blue-600'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 22 22'
                           fill='none'
                           className='ml-4 h-5 w-5'
                        >
                           <path
                              fill='currentColor'
                              d='M20.04 9.719a.75.75 0 0 0-1.5 0h1.5Zm-14.58 0a.75.75 0 1 0-1.5 0h1.5Zm9.053 10.988-.172-.73.172.73Zm-5.026 0 .172-.73-.172.73Zm5.341-15.693-.532.529.532-.529Zm5.64 6.744a.75.75 0 1 0 1.064-1.057l-1.064 1.057ZM9.172 5.014l.532.529-.532-.529Zm-6.704 5.687a.75.75 0 1 0 1.064 1.057l-1.064-1.057Zm7.25 7.62-.737-.14.737.14Zm.02-.104.737.139-.737-.139Zm4.524 0-.737.139.737-.139Zm.02.103.737-.138-.737.138Zm-.29 2.232-.677-.322.677.322Zm-.794-.077a.75.75 0 0 0 1.354.645l-1.354-.645Zm-3.19.077-.677.322.677-.322Zm-.56.568a.75.75 0 0 0 1.354-.645l-1.354.645Zm1.913-4.677-.2-.723.2.723Zm1.278 0 .2-.723-.2.723Zm5.901-6.724v4.918h1.5V9.72h-1.5ZM5.46 14.637V9.72h-1.5v4.918h1.5Zm8.88 5.34a10.18 10.18 0 0 1-4.68 0l-.346 1.46a11.68 11.68 0 0 0 5.372 0l-.345-1.46Zm-4.68 0c-2.457-.58-4.2-2.79-4.2-5.34h-1.5c0 3.24 2.214 6.058 5.354 6.8l.345-1.46Zm5.026 1.46c3.14-.742 5.354-3.56 5.354-6.8h-1.5c0 2.55-1.743 4.76-4.2 5.34l.346 1.46Zm-.39-15.894 6.172 6.215 1.064-1.057-6.171-6.215-1.065 1.057ZM8.64 4.486 2.468 10.7l1.064 1.057 6.172-6.215-1.065-1.057Zm6.722 0c-.652-.657-1.193-1.204-1.68-1.577-.502-.387-1.035-.659-1.681-.659v1.5c.183 0 .397.064.768.348.387.298.847.758 1.528 1.445l1.065-1.057ZM9.704 5.543c.681-.687 1.14-1.147 1.528-1.445.37-.284.585-.348.768-.348v-1.5c-.646 0-1.178.272-1.682.659-.486.373-1.027.92-1.679 1.577l1.065 1.057Zm.752 12.916.019-.103L9 18.079l-.02.103 1.475.277Zm3.07-.103.018.103 1.475-.277-.02-.103-1.474.277Zm-.211 1.874-.117.245 1.354.645.117-.246-1.354-.644Zm-3.984.644.117.246 1.354-.645-.117-.245-1.354.644Zm4.213-2.415c.113.6.032 1.22-.23 1.77l1.355.645c.399-.837.52-1.78.35-2.692l-1.475.277Zm-4.563-.277a4.385 4.385 0 0 0 .35 2.692l1.354-.644a2.884 2.884 0 0 1-.23-1.771l-1.474-.277Zm2.58-1.017c.287-.08.59-.08.877 0l.401-1.445a3.138 3.138 0 0 0-1.678 0l.4 1.445ZM15 18.08a3.024 3.024 0 0 0-2.16-2.36l-.4 1.446c.554.154.978.614 1.086 1.19L15 18.08Zm-4.524.277a1.524 1.524 0 0 1 1.087-1.19l-.401-1.446A3.024 3.024 0 0 0 9 18.079l1.474.277Z'
                           ></path>
                        </svg>
                        <span className='font-bold text-sm block'>حساب کاربری</span>
                     </div>
                  </Link>
               </li>
               <li
                  className='rounded-lg py-1 px-4 hover:bg-gray-100 transition-all duration-300 ease-out mb-1'
                  role='menuitem'
               >
                  <Link className='block w-full' href='/profile/courses'>
                     <div className='flex py-2 text-skin-base hover:text-blue-600'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           fill='none'
                           className='ml-4 h-5 w-5'
                        >
                           <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeWidth='1.5'
                              d='M3.862 10.703a10.891 10.891 0 0 0-.006 5.548 6.03 6.03 0 0 0 4.597 4.368l.155.032a16.66 16.66 0 0 0 6.784 0l.155-.032a6.03 6.03 0 0 0 4.597-4.368 10.89 10.89 0 0 0-.006-5.548c-.577-2.179-2.337-3.875-4.535-4.331a17.698 17.698 0 0 0-7.206 0m-4.535 4.331C4.44 8.524 6.2 6.828 8.397 6.372m-4.535 4.331c-.198.75-.315 1.52-.35 2.292V7.252a4.235 4.235 0 0 1 3.1-4.061A5.26 5.26 0 0 1 8.01 3h.858c1.68 0 3.654 1.311 4.378 3.045-1.206 0-3.662.08-4.85.327m6.214 2.397.043.007a3.71 3.71 0 0 1 3.09 3.664M3.51 13.996v.018l.001.002v-.02Z'
                           ></path>
                        </svg>
                        <span className='font-bold text-sm block'>دوره های من</span>
                     </div>
                  </Link>
               </li>
               <li
                  className='rounded-lg px-4 hover:bg-gray-100 transition-all duration-300 ease-out'
                  role='menuitem'
               >
                  <div className='w-full items-center flex hover:text-red-400 cursor-pointer'>
                     <svg
                        stroke='currentColor'
                        fill='none'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        className='ml-4 h-5 w-5'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           strokeLinecap='round'
                           strokeLinejoin='round'
                           strokeWidth='2'
                           d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        ></path>
                     </svg>
                     <LogoutButton />
                  </div>
               </li>
            </ul>
         </Popover>
      </>
   )
}

export default Profile
