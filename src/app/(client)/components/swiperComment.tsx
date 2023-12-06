'use client'

import { useEffect } from 'react'
// @ts-ignore
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

import Comment from './comment'
import { ICourse } from '@/models/workingDay'

const SwiperComments = ({ comments }: { comments: ICourse['comments'] }) => {
   useEffect(() => {
      new Swiper('.swiperComments', {
         loop: true,
         speed: 1000,
         effect: 'cards',
         autoplay: {
            delay: 5000,
         },
         cardsEffect: {
            slideShadows: true,
         },
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            dynamicBullets: true,
         },
         breakpoints: {
            745: {
               slidesPerView: 2,
               cardsEffect: false,
               spaceBetween: 20,
            },
         },
      })
   }, [])

   return (
      <div className='swiperComments rtl overflow-hidden'>
         <div className='swiper-wrapper pb-10'>
            {comments.map((comment) => {
               return (
                  <div key={comment._id} className='swiper-slide pb-4 rounded-xl'>
                     <Comment comment={JSON.parse(JSON.stringify(comment))} />
                  </div>
               )
            })}
         </div>
         <div className='swiper-pagination'></div>
      </div>
   )
}

export default SwiperComments
