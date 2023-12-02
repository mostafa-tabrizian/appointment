import Link from 'next/link'
import Button from '@mui/material/Button'

import SwiperCourses from './swiperCourses'

const NewestCourses = () => {
   return (
      <div className='bg-gradient-to-bl md:grid md:grid-cols-3 from-slate-200 to-slate-50 rounded-lg p-2 pt-4'>
         <div className='mb-20 text-center md:flex md:flex-col md:justify-center md:px-10 md:text-right space-y-6 md:col-span-1 md:order-2 md:mb-0 md:z-10'>
            <h2 className='font-extraBold text-3xl md:text-4xl'>جدیدترین دوره ها</h2>
            <p className='text-sm pb-6'>دوره ببین، تمرین کن و بهترین شو</p>
            <Link href='/course'>
               <Button variant='contained' sx={{ borderRadius: '15px', padding: '.75rem 2.5rem' }}>
                  همه دوره ها
               </Button>
            </Link>
         </div>

         <div className='relative col-span-2 overflow-hidden'>
            <SwiperCourses />
         </div>
      </div>
   )
}

export default NewestCourses
