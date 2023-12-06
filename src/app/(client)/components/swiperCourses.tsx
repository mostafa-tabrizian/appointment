'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
// @ts-ignore
import Swiper from 'swiper/bundle'
import { toast } from 'react-toastify'
import 'swiper/css/bundle'

import { ICourse } from '@/models/workingDay'
import CourseCards from '@/components/course/cards'
import stringtoDate from '@/lib/stringToDate'
import fetcher from '@/lib/fetcher'
import CircularProgress from '@mui/material/CircularProgress'

const SwiperCourses = () => {
   const {
      data: courses,
      isLoading,
      error,
   }: { data: [ICourse]; isLoading: boolean; error: unknown } = useSWR('/api/course', fetcher)

   if (error) {
      toast.error('دریافت برند ها به مشکل برخورد کرد!')
      console.error(error)
   }

   courses?.sort((a, b) => stringtoDate(b.createdAt) - stringtoDate(a.createdAt))

   useEffect(() => {
      new Swiper('.swiperCourses', {
         speed: 1000,
         spaceBetween: 50,
         autoplay: {
            delay: 5000,
         },
         loop: true,
         effect: 'coverflow',
         slidesPerView: 1,
         coverflowEffect: {
            rotate: 30,
            slideShadows: false,
         },
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
         },
         breakpoints: {
            745: {
               slidesPerView: 2.3,
               coverflowEffect: false,
               spaceBetween: 20,
            },
         },
      })
   }, [])

   return (
      <div className='swiperCourses rtl'>
         <div className='swiper-wrapper py-5'>
            {isLoading ? (
               <div className='flex w-full justify-center my-20'>
                  <CircularProgress size={40} />
               </div>
            ) : (
               <>
                  {courses.map((course) => {
                     return (
                        <div key={course._id} className='swiper-slide'>
                           <CourseCards course={course} />
                        </div>
                     )
                  })}
               </>
            )}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperCourses
