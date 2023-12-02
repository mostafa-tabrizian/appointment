import Link from 'next/link'
import Sidebar from './sidebar'
import Profile from './Profile'
import Button from '@mui/material/Button'
import Cart from './cart'
import LinksForDesktop from './headerLinksforDesktop'
import { IUser } from '@/models/user'

const Header = ({ user }: { user: IUser }) => {
   const simpleUser = {
      mobileNumber: user?.mobileNumber,
      name: user?.name,
      avatar: user?.avatar,
      role: user?.role,
   }

   return (
      <header className='bg-white'>
         <div className='md:max-w-screen-lg md:mx-auto py-2 px-3 flex items-center justify-between'>
            {user ? (
               <div className='flex gap-3'>
                  <Profile user={simpleUser} />
                  <Cart />
               </div>
            ) : (
               <div className='flex items-center mx-2'>
                  <Link href='/auth'>
                     <Button variant='contained'>
                        <span className='font-bold text-white rounded-xl w-20 text-sm'>ورود</span>
                     </Button>
                  </Link>
               </div>
            )}
            <div className='flex p-1 items-center gap-x-5'>
               <Link href='/'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 35 32'
                     fill='none'
                     className='h-8 w-8 fill-blue-600 block md:hidden'
                  >
                     <path
                        fill='currenColor'
                        d='M15.258 26.865a4.043 4.043 0 0 1-1.133 2.917 4.004 4.004 0 0 1-4.432.901 4.027 4.027 0 0 1-2.445-3.818 3.97 3.97 0 0 1 2.027-3.414c.09-.055-.024.109 0 0l1.86-1.652a8.495 8.495 0 0 0 2.304-5.793c0-2.926-1.711-5.901-4.17-7.457-.036-.094.094.055 0 0a3.975 3.975 0 0 1-2.026-3.413 4.042 4.042 0 0 1 1.133-2.918A4.006 4.006 0 0 1 11.246 1a3.99 3.99 0 0 1 2.873 1.218 4.024 4.024 0 0 1 1.133 2.917 8.52 8.52 0 0 0 2.347 5.832l.817.8c.326.285.668.551 1.024.798a3.88 3.88 0 0 1 1.504 1.431 3.901 3.901 0 0 1-1.504 5.442c-.063.036.033-.067 0 0a8.969 8.969 0 0 0-3.024 3.183 9.017 9.017 0 0 0-1.158 4.244ZM19.74 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 0 0 1.798 1.482 3.99 3.99 0 0 0 4.366-.873 4.042 4.042 0 0 0 .869-4.386 4.02 4.02 0 0 0-1.476-1.806 3.994 3.994 0 0 0-5.058.501 4.038 4.038 0 0 0-1.175 2.845Zm4.007 17.717c-.792 0-1.567.236-2.226.678a4.021 4.021 0 0 0-1.476 1.806 4.042 4.042 0 0 0 .869 4.387 3.99 3.99 0 0 0 4.366.873 4.01 4.01 0 0 0 1.8-1.484 4.039 4.039 0 0 0-.5-5.082 4 4 0 0 0-2.832-1.18v.002ZM34 15.994a4.04 4.04 0 0 0-.675-2.236 4.01 4.01 0 0 0-1.798-1.483 3.99 3.99 0 0 0-4.367.873 4.042 4.042 0 0 0-.87 4.387 4.02 4.02 0 0 0 1.477 1.806 3.993 3.993 0 0 0 5.058-.502A4.04 4.04 0 0 0 34 15.993v.001Z'
                     ></path>
                     <path
                        fill='currenColor'
                        d='M5.007 11.969c-.793 0-1.567.236-2.226.678a4.02 4.02 0 0 0-1.476 1.807 4.042 4.042 0 0 0 .87 4.386 4.002 4.002 0 0 0 4.365.873 4.01 4.01 0 0 0 1.798-1.483 4.038 4.038 0 0 0-.5-5.08 4.004 4.004 0 0 0-2.83-1.181Z'
                     ></path>
                  </svg>
               </Link>

               <Sidebar user={simpleUser} />

               <LinksForDesktop />
            </div>
         </div>
      </header>
   )
}

export default Header
