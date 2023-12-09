import Button from '@mui/material/Button'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Image from 'next/image'

const Hero = () => {
   return (
      <div className='flex h-screen items-center'>
         <div className='grid md:grid-cols-2'>
            <Image
               alt='expressify landpage'
               src='/hero_doctor.jpg'
               width={800}
               height={800}
               quality={100}
               priority
               className='mb-10 md:mb-0'
            />

            <div className='m-auto'>
               <h1 className=' mb-2 text-center text-2xl font-black leading-relaxed text-slate-800 md:mb-5 md:text-right md:text-5xl md:leading-tight'>
                  تو صف نباش <br /> همین الان رزرو کن
               </h1>
               <p className='mb-6 text-center text-xs font-medium text-gray-400 md:mb-2 md:text-right md:text-lg'>
                  رزرو سریع و آنلاین کلینیک اکسیر
               </p>
               <hr className='mx-auto w-60 md:mr-0' />

               <div className='md:flex md:flex-row-reverse md:items-center md:justify-start md:gap-10'>
                  <div className='flex justify-center md:justify-end'>
                     <Button
                        variant='contained'
                        sx={{
                           borderRadius: '20px',
                           padding: '.75rem 2rem',
                           boxShadow: '0 5px 10px #9da0ff',
                        }}
                     >
                        <Link href='/learning-path' className=''>
                           <span className='text-lg text-white'>رزرو کن!</span>
                        </Link>
                     </Button>
                  </div>

                  <div className='mt-5 grid justify-center'>
                     <div className='mx-auto md:ml-auto'>
                        <AvatarGroup>
                           <Avatar
                              sx={{ width: 32, height: 32 }}
                              alt='Mostaf Tabrizian'
                              src='/avatar/me.jpg'
                           />
                           <Avatar
                              sx={{ width: 32, height: 32 }}
                              alt='Travis Howard'
                              src='/avatar/avatar2.jpg'
                           />
                           <Avatar
                              sx={{ width: 32, height: 32 }}
                              alt='Agnes Walker'
                              src='/avatar/avatar3.jpg'
                           />
                           <Avatar
                              sx={{ width: 32, height: 32 }}
                              alt='Trevor Henderson'
                              src='/avatar/avatar4.jpg'
                           />
                        </AvatarGroup>
                     </div>

                     <p className='mx-auto mt-1 flex items-center space-x-1 text-sm'>
                        <svg
                           viewBox='0 0 15 15'
                           fill='none'
                           xmlns='http://www.w3.org/2000/svg'
                           className='ml-1 h-4 w-4 text-blue-500'
                        >
                           <path
                              d='M7.5 1.875c-1.521 0-2.755 1.223-2.755 2.732 0 1.51 1.234 2.732 2.755 2.732s2.755-1.223 2.755-2.732c0-1.509-1.234-2.732-2.755-2.732ZM9.126 8.555a10.398 10.398 0 0 0-3.252 0l-.115.018a3.109 3.109 0 0 0-2.634 3.063c0 .822.672 1.489 1.502 1.489h5.746c.83 0 1.502-.667 1.502-1.49a3.109 3.109 0 0 0-2.634-3.062l-.115-.018Z'
                              fill='currentColor'
                           ></path>
                        </svg>
                        <span className='text-sm font-bold text-blue-500 md:text-sm'>۳۱</span>
                        <span className='text-xs text-slate-800'>از بهترین پزشکان و متخصصین</span>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
