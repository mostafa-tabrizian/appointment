import Button from '@mui/material/Button'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Image from 'next/image'

const Hero = () => {
   return (
      <div className='grid md:grid-cols-2'>
         <Image
            alt='expressify landpage'
            src='/landpage.jpg'
            width={527}
            height={527}
            priority
            quality={70}
            className=' mix-blend-multiply mb-10 md:mb-0'
         />

         <div className='mx-auto'>
            <h1 className=' font-black text-center md:text-right text-2xl md:text-5xl leading-relaxed md:leading-loose text-slate-800 mb-2 md:mb-5'>
               زبان انگلیسی را سریع <br /> و آسان یاد بگیرید
            </h1>
            <p className='text-xs text-center md:text-right md:text-lg font-medium text-gray-400 mb-6 md:mb-2'>
               ،ما کنارتون هستیم تا عمیق یاد بگیرید
               <br />
               .و با بهترین مسیر ممکن به مقصدتون برسید
            </p>
            <hr className='w-60 mx-auto md:mr-0' />

            <div className='md:flex md:items-center md:justify-start md:gap-10 md:flex-row-reverse'>
               <div className='flex justify-center md:justify-end'>
                  <Button variant='contained' sx={{ borderRadius: '30px', padding: '.75rem 2rem' }}>
                     <Link href='/learning-path' className='shdaow shadow-2xl shadow-blue-900'>
                        <span className='text-lg text-white'>!بزن بریم</span>
                     </Link>
                  </Button>
               </div>

               <div className='grid justify-center mt-5'>
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

                  <p className='flex items-center mx-auto text-sm mt-1'>
                     <span className='text-slate-800 text-xs'>هزار زبان آموز</span>
                     <span className=' text-blue-500 text-sm mx-0.5 font-bold md:text-sm'>۷.۵</span>
                     <svg
                        viewBox='0 0 15 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3 w-3 text-blue-500'
                     >
                        <path
                           d='M7.5 1.875c-1.521 0-2.755 1.223-2.755 2.732 0 1.51 1.234 2.732 2.755 2.732s2.755-1.223 2.755-2.732c0-1.509-1.234-2.732-2.755-2.732ZM9.126 8.555a10.398 10.398 0 0 0-3.252 0l-.115.018a3.109 3.109 0 0 0-2.634 3.063c0 .822.672 1.489 1.502 1.489h5.746c.83 0 1.502-.667 1.502-1.49a3.109 3.109 0 0 0-2.634-3.062l-.115-.018Z'
                           fill='currentColor'
                        ></path>
                     </svg>
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Hero
