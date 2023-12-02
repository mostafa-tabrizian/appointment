'use client'

const Drawer = dynamic(() => import('@mui/material/Drawer'))
import Link from 'next/link'
import { useState, useEffect } from 'react'
const Collapse = dynamic(() => import('@mui/material/Collapse'))
import dynamic from 'next/dynamic'
import Button from '@mui/material/Button'
// import Avatar from '@mui/material/Avatar'
import { usePathname } from 'next/navigation'

interface IUser {
   name: string | undefined
   avatar: string | undefined
   mobileNumber: string | undefined
   role: string | undefined
}

const Sidebar = ({ user }: { user: IUser }) => {
   const [sidebar, setSidebar] = useState(false)
   const [contactUsOptions, setContactUsOptions] = useState(false)

   const pathname = usePathname()
   useEffect(() => setSidebar(false), [pathname])

   return (
      <div className='md:hidden'>
         <button onClick={() => setSidebar(true)}>
            <svg
               stroke='currentColor'
               fill='none'
               strokeWidth='0'
               viewBox='0 0 24 24'
               className='h-7 w-7 text-slate-600'
               height='1em'
               width='1em'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
               ></path>
            </svg>
         </button>
         <Drawer anchor='right' open={sidebar} onClose={() => setSidebar(false)}>
            <div>
               <div className='p-5 w-60'>
                  <div className='flex gap-20 items-center justify-between'>
                     <button onClick={() => setSidebar(false)}>
                        <svg
                           stroke='currentColor'
                           fill='none'
                           strokeWidth='0'
                           viewBox='0 0 24 24'
                           className='w-6 h-6 text-gray-700'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M6 18L18 6M6 6l12 12'
                           ></path>
                        </svg>
                     </button>
                  </div>

                  <hr />

                  <ul className='gap-y-2 rtl mt-10 md:gap-y-0 flex flex-col md:flex-row md:items-center justify-between gap-x-8 text-gray-700 md:text-skin-base'>
                     <li className='block md:hidden'>
                        <Link href='/'>
                           <div className='relative menu-item flex items-center text-blue-600'>
                              <span className='py-2 md:py-1 flex items-center gap-x-2 md:hover:text-blue-600 cursor-pointer font-bold'>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 22 22'
                                    fill='none'
                                    className='h-5 w-5'
                                    stroke='currentColor'
                                    strokeWidth={0}
                                 >
                                    <path
                                       fill='currentColor'
                                       d='M20.04 9.719a.75.75 0 0 0-1.5 0h1.5Zm-14.58 0a.75.75 0 1 0-1.5 0h1.5Zm9.053 10.988-.172-.73.172.73Zm-5.026 0 .172-.73-.172.73Zm5.341-15.693-.532.529.532-.529Zm5.64 6.744a.75.75 0 1 0 1.064-1.057l-1.064 1.057ZM9.172 5.014l.532.529-.532-.529Zm-6.704 5.687a.75.75 0 1 0 1.064 1.057l-1.064-1.057Zm7.25 7.62-.737-.14.737.14Zm.02-.104.737.139-.737-.139Zm4.524 0-.737.139.737-.139Zm.02.103.737-.138-.737.138Zm-.29 2.232-.677-.322.677.322Zm-.794-.077a.75.75 0 0 0 1.354.645l-1.354-.645Zm-3.19.077-.677.322.677-.322Zm-.56.568a.75.75 0 0 0 1.354-.645l-1.354.645Zm1.913-4.677-.2-.723.2.723Zm1.278 0 .2-.723-.2.723Zm5.901-6.724v4.918h1.5V9.72h-1.5ZM5.46 14.637V9.72h-1.5v4.918h1.5Zm8.88 5.34a10.18 10.18 0 0 1-4.68 0l-.346 1.46a11.68 11.68 0 0 0 5.372 0l-.345-1.46Zm-4.68 0c-2.457-.58-4.2-2.79-4.2-5.34h-1.5c0 3.24 2.214 6.058 5.354 6.8l.345-1.46Zm5.026 1.46c3.14-.742 5.354-3.56 5.354-6.8h-1.5c0 2.55-1.743 4.76-4.2 5.34l.346 1.46Zm-.39-15.894 6.172 6.215 1.064-1.057-6.171-6.215-1.065 1.057ZM8.64 4.486 2.468 10.7l1.064 1.057 6.172-6.215-1.065-1.057Zm6.722 0c-.652-.657-1.193-1.204-1.68-1.577-.502-.387-1.035-.659-1.681-.659v1.5c.183 0 .397.064.768.348.387.298.847.758 1.528 1.445l1.065-1.057ZM9.704 5.543c.681-.687 1.14-1.147 1.528-1.445.37-.284.585-.348.768-.348v-1.5c-.646 0-1.178.272-1.682.659-.486.373-1.027.92-1.679 1.577l1.065 1.057Zm.752 12.916.019-.103L9 18.079l-.02.103 1.475.277Zm3.07-.103.018.103 1.475-.277-.02-.103-1.474.277Zm-.211 1.874-.117.245 1.354.645.117-.246-1.354-.644Zm-3.984.644.117.246 1.354-.645-.117-.245-1.354.644Zm4.213-2.415c.113.6.032 1.22-.23 1.77l1.355.645c.399-.837.52-1.78.35-2.692l-1.475.277Zm-4.563-.277a4.385 4.385 0 0 0 .35 2.692l1.354-.644a2.884 2.884 0 0 1-.23-1.771l-1.474-.277Zm2.58-1.017c.287-.08.59-.08.877 0l.401-1.445a3.138 3.138 0 0 0-1.678 0l.4 1.445ZM15 18.08a3.024 3.024 0 0 0-2.16-2.36l-.4 1.446c.554.154.978.614 1.086 1.19L15 18.08Zm-4.524.277a1.524 1.524 0 0 1 1.087-1.19l-.401-1.446A3.024 3.024 0 0 0 9 18.079l1.474.277Z'
                                    ></path>
                                 </svg>
                                 <span className='text-base'>خانه</span>
                              </span>
                           </div>
                        </Link>
                     </li>
                     <li className='block '>
                        <Link href='/course'>
                           <div className='relative menu-item flex items-center '>
                              <span className='py-2 md:py-1 flex items-center gap-x-2 md:hover:text-blue-600 cursor-pointer'>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    className='h-5 w-5'
                                    stroke='currentColor'
                                 >
                                    <path
                                       stroke='currentColor'
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       d='M14.667 11.16V3.113c0-.8-.654-1.393-1.447-1.326h-.04c-1.4.12-3.527.833-4.713 1.58l-.114.073a.739.739 0 0 1-.706 0l-.167-.1C6.293 2.6 4.173 1.893 2.773 1.78a1.312 1.312 0 0 0-1.44 1.327v8.053c0 .64.52 1.24 1.16 1.32l.194.027c1.446.193 3.68.926 4.96 1.626l.026.014c.18.1.467.1.64 0 1.28-.707 3.52-1.447 4.974-1.64l.22-.027c.64-.08 1.16-.68 1.16-1.32ZM8 3.66v10m-2.833-8h-1.5m2 2h-2'
                                    ></path>
                                 </svg>
                                 <span className='text-base'>دوره های آموزشی</span>
                              </span>
                           </div>
                        </Link>
                     </li>
                     <li className='block '>
                        <Link href='/hired'>
                           <div className='relative menu-item flex items-center '>
                              <span className='py-2 md:py-1 flex items-center gap-x-2 md:hover:text-blue-600 cursor-pointer'>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    className='h-5 w-5'
                                    stroke='currentColor'
                                 >
                                    <path
                                       stroke='currentColor'
                                       strokeWidth='1.5'
                                       d='m15.875 19.487.18-.124c.566-.391.849-.587 1.101-.796a7.495 7.495 0 0 0 2.603-4.476c.056-.323.086-.664.144-1.346l.03-.353A17.996 17.996 0 0 0 19.906 9l-.036-.349a5.75 5.75 0 0 0-3.205-4.574 10.642 10.642 0 0 0-9.328 0A5.75 5.75 0 0 0 4.13 8.65L4.094 9a17.993 17.993 0 0 0-.029 3.391l.03.353c.06.682.089 1.023.145 1.346a7.495 7.495 0 0 0 2.603 4.476c.253.21.535.405 1.1.796l.18.124c.769.532 1.153.797 1.538.982a5.41 5.41 0 0 0 4.676 0c.385-.185.77-.45 1.537-.982Z'
                                    ></path>
                                    <path
                                       stroke='currentColor'
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='1.5'
                                       d='m9.25 11.75 2 2 3.5-3.75'
                                    ></path>
                                 </svg>
                                 <span className='text-base'>استخدامی بچه ها</span>
                              </span>
                           </div>
                        </Link>
                     </li>
                     <li className='block '>
                        <div className='text-gray-700'>
                           <button
                              onClick={() => setContactUsOptions((prev) => !prev)}
                              className='w-full'
                           >
                              <span className='py-1 flex items-center gap-x-2 cursor-pointer '>
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    className='h-5 w-5'
                                    stroke='currentColor'
                                 >
                                    <path
                                       stroke='currentColor'
                                       strokeLinecap='round'
                                       strokeWidth='1.5'
                                       d='m6.793 8.625 2.142 1.53a1.832 1.832 0 0 0 2.13 0l2.142-1.53M2.404 12.626a10.897 10.897 0 0 1 0-5.252 6.127 6.127 0 0 1 4.621-4.506l.379-.084a12 12 0 0 1 5.192 0l.379.084a6.127 6.127 0 0 1 4.62 4.506 10.897 10.897 0 0 1 0 5.252 6.127 6.127 0 0 1-4.62 4.506l-.379.084c-1.71.379-3.482.379-5.192 0l-.379-.084a6.127 6.127 0 0 1-4.62-4.506Z'
                                    ></path>
                                 </svg>
                                 <span className='text-base'>ارتباط با ما</span>
                                 <svg
                                    stroke='currentColor'
                                    fill='none'
                                    strokeWidth='0'
                                    viewBox='0 0 24 24'
                                    className={`h-4 w-4 transition ease-in-out duration-300 ${
                                       contactUsOptions ? 'rotate-90' : 'rotate-0'
                                    }`}
                                    height='1em'
                                    width='1em'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       strokeWidth='2'
                                       d='M19 9l-7 7-7-7'
                                    ></path>
                                 </svg>
                              </span>
                           </button>

                           <Collapse in={contactUsOptions}>
                              <ul className='mt-3 border-b border-white border-opacity-10'>
                                 <Link href='#'>
                                    <li className='flex items-center rounded-lg text-gray-700 opacity-90 mb-4 pr-2'>
                                       <span>
                                          <svg
                                             stroke='currentColor'
                                             fill='currentColor'
                                             strokeWidth='0'
                                             viewBox='0 0 1024 1024'
                                             className='opacity-70 md:opacity-100 h-5 w-5 ml-1 md:text-skin-base'
                                             height='1em'
                                             width='1em'
                                             xmlns='http://www.w3.org/2000/svg'
                                          >
                                             <path d='M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z'></path>
                                          </svg>
                                       </span>
                                       <p className='font-medium px-1'>
                                          <span className='text-sm'>صفحه اینستاگرام</span>
                                       </p>
                                    </li>
                                 </Link>
                                 <Link href='/about-us'>
                                    <li className='flex items-center rounded-lg text-gray-700 opacity-90 mb-4 pr-2'>
                                       <span>
                                          <svg
                                             viewBox='0 0 24 24'
                                             fill='none'
                                             xmlns='http://www.w3.org/2000/svg'
                                             className='opacity-70 md:opacity-100 h-5 w-5 ml-1 md:text-skin-base'
                                          >
                                             <path
                                                d='M3.353 8.95A7.511 7.511 0 0 1 8.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 0 1 5.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 0 1-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 0 1-5.597-5.597 13.354 13.354 0 0 1 0-6.1Z'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                             ></path>
                                             <path
                                                d='M12 15.5v-4'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                             ></path>
                                             <circle
                                                cx='12'
                                                cy='9'
                                                r='0.5'
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                             ></circle>
                                          </svg>
                                       </span>
                                       <p className='font-medium px-1'>
                                          <span className='text-sm'>درباره ما</span>
                                       </p>
                                    </li>
                                 </Link>
                                 <Link href='#'>
                                    <li className='flex items-center rounded-lg text-gray-700 opacity-90 mb-4 pr-2'>
                                       <span>
                                          <svg
                                             stroke='currentColor'
                                             fill='currentColor'
                                             strokeWidth='0'
                                             viewBox='0 0 24 24'
                                             className='opacity-70 md:opacity-100 h-5 w-5 ml-1 md:text-skin-base'
                                             height='1em'
                                             width='1em'
                                             xmlns='http://www.w3.org/2000/svg'
                                          >
                                             <g>
                                                <path fill='none' d='M0 0h24v24H0z'></path>
                                                <path
                                                   fillRule='nonzero'
                                                   d='M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.804l9.733-3.76c.565-.23.885.061.702.79l-1.657 7.82c-.116.557-.451.69-.916.433l-2.551-1.888-1.189 1.148c-.122.118-.221.219-.409.244-.187.026-.341-.03-.454-.34l-.87-2.871-.012.008z'
                                                ></path>
                                             </g>
                                          </svg>
                                       </span>
                                       <p className='font-medium px-1'>
                                          <span className='text-sm'>کانال تلگرام</span>
                                       </p>
                                    </li>
                                 </Link>
                              </ul>
                           </Collapse>
                        </div>
                     </li>
                     {user?.role === 'ادمین' ? (
                        <li className='block '>
                           <Link href='/admin'>
                              <div className='relative menu-item flex items-center '>
                                 <span className='py-2 md:py-1 flex items-center gap-x-2 md:hover:text-blue-600 cursor-pointer'>
                                    <svg
                                       className='h-5 w-5'
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
                                       <path stroke='none' d='M0 0h24v24H0z' />{' '}
                                       <path d='M11 17a2.5 2.5 0 0 0 2 0' />{' '}
                                       <path d='M12 3C7.336 3 4.604 5.331 4.138 8.595a11.816 11.816 0 0 0 1.998 8.592 10.777 10.777 0 003.199 3.064h0c1.666.999 3.664.999 5.33 0h0a10.777 10.777 0 0 0 3.199 -3.064 11.89 11.89 0 001.998-8.592C19.396 5.33 16.664 3 12 3z' />{' '}
                                       <line x1='8' y1='11' x2='10' y2='13' />{' '}
                                       <line x1='16' y1='11' x2='14' y2='13' />
                                    </svg>
                                    <span className='text-base'>ادمین</span>
                                 </span>
                              </div>
                           </Link>
                        </li>
                     ) : (
                        ''
                     )}
                  </ul>
               </div>
            </div>
            {user ? (
               <div className='px-7 py-10 mt-auto'>
                  <div className='flex rtl justify-between items-center w-full'>
                     <div className='flex items-center flex-1'>
                        <div className='relative ml-4'>
                           <Link href='/profile'>
                              {/* <Avatar
                                 sx={{
                                    width: 42,
                                    height: 42,
                                    border: '2px solid white',
                                    boxShadow: '0 0 10px #8080805c',
                                 }}
                                 alt={user.name}
                                 src={'/avatar/' + user.avatar}
                              /> */}
                           </Link>
                           <span className='flex h-2 w-2 absolute bottom-0 right-1'>
                              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75'></span>
                              <span className='relative bg-green-500 inline-flex rounded-full h-2 w-2'></span>
                           </span>
                        </div>
                        <div className='text-sm w-full flex flex-col justify-between text-gray-700'>
                           <Link href='/profile'>
                              <span className='font-bold block mb-1'>
                                 {user.name || user.mobileNumber}
                              </span>
                           </Link>
                           <span className='block opacity-60'>{user.role}</span>
                        </div>
                     </div>
                     <Link href='/profile/edit'>
                        <button>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 14 14'
                              fill='none'
                              className='h-5 w-5 text-gray-700 opacity-100'
                           >
                              <path
                                 stroke='currentColor'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='0.875'
                                 d='M7.779 11.38h3.72'
                              ></path>
                              <path
                                 stroke='currentColor'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='0.875'
                                 d='M9.367 2.834v0a1.774 1.774 0 0 0-2.484.354L2.945 8.436c-1.015 1.352-.055 3.027-.055 3.027s1.892.435 2.892-.898L9.72 5.318a1.774 1.774 0 0 0-.354-2.484Z'
                                 clipRule='evenodd'
                              ></path>
                              <path
                                 stroke='#fff'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='0.875'
                                 d='m6.127 4.207 2.838 2.13'
                              ></path>
                           </svg>
                        </button>
                     </Link>
                  </div>
               </div>
            ) : (
               <div className='px-7 py-10 mt-auto'>
                  <Link href='/auth'>
                     <Button variant='contained' sx={{ width: '100%' }}>
                        <span className='font-bold text-white rounded-xl w-20 text-sm'>ورود</span>
                     </Button>
                  </Link>
               </div>
            )}
         </Drawer>
      </div>
   )
}

export default Sidebar
