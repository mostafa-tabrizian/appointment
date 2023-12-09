'use client'

import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { IAppointment } from '@/models/appointment'

import { Switch } from '@mui/material'

const DetailForm = memo(({ appointment }: { appointment: IAppointment }) => {
   const [active, setActive] = useState(appointment.active)

   const handleActiveChange = async () => {
      const res = await fetch('/api/appointment', {
         method: 'PATCH',
         body: JSON.stringify({
            _id: appointment._id,
         }),
      })

      const resData = await res.json()

      if (resData.status == 200) {
         setActive((prev) => !prev)
         toast.success('وضعیت با موفقیت آپدیت شد')
      } else if (resData.status == 500) toast.error('تغییر وضعیت آپدیت به مشکل برخورد')
      else {
         toast.error('بازگشت پاسخ از سرور با مشکل برخورد')
         console.log(resData)
      }
   }

   return (
      <div className='mt-6 space-y-5'>
         <div className='flex w-full gap-5 rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'>
            <p>تاریخ و ساعت رزرو: </p>
            <p>{new Date(appointment.reservedAt).toLocaleString('fa')}</p>
         </div>

         <div className='grid grid-cols-2 gap-5'>
            <div className='flex w-full gap-5 rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'>
               <p>رزرو کننده: </p>
               <p>{appointment.name}</p>
            </div>

            <div className='flex w-full gap-5 rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'>
               <p>شماره تماس: </p>
               <p>{appointment.mobileNumber}</p>
            </div>
         </div>

         <div className='w-full gap-5 space-y-3 rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'>
            <p>توضیحات: </p>
            <p>{appointment.description || 'توضیحاتی ثبت نشده است.'}</p>
         </div>

         <div className='grid grid-cols-2 justify-between gap-10'>
            <div>
               <div className='flex items-center gap-5'>
                  <span className='text-slate-600'>رزرو فعال است</span>

                  <Switch
                     checked={active}
                     name='active'
                     color='success'
                     onChange={handleActiveChange}
                  />
               </div>

               <span className='!my-0 flex justify-start text-right text-[.65rem] text-rose-400'>
                  میتوانید به جای حذف رزرو آن را مخفی کنید تا در تقویم ثبت رزرو اعمال نشود
               </span>
            </div>
            <div>
               <div className='flex items-center gap-5'>
                  <span className='text-slate-600'>پرداخت</span>

                  {appointment.paid ? '✔️' : '❌'}
               </div>
            </div>
         </div>
      </div>
   )
})

DetailForm.displayName = 'DetailForm'

export default DetailForm
