'use client'

import { IAppointment } from '@/models/appointment'
import { IWorkingDay } from '@/models/workingDays'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Calendar, CalendarProvider } from 'zaman'

const Calender = ({
   workingDays,
   appointments,
}: {
   workingDays: IWorkingDay[]
   appointments: IAppointment[]
}) => {
   const [calendarValue, setCalendarValue] = useState(new Date())
   const [timeValue, setTimeValue] = useState(0)

   const handleSubmit = async () => {
      const year = calendarValue.getFullYear()
      const month = calendarValue.getMonth()
      const day = calendarValue.getDate()
      const hour = Math.floor(timeValue / 60)
      const min = timeValue % 60

      const reserverdDate = new Date(year, month, day, hour, min)

      try {
         toast.info('در حال ثبت رزرو...')

         const res = await fetch('/api/appointment', {
            method: 'POST',
            body: JSON.stringify({
               name: 'مصطفی تبریزیان',
               mobileNumber: '09128521769',
               description: 'تست از فیتچ',
               paid: true,
               reservedDate: reserverdDate,
            }),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         toast.success('رزرو شما با موفقیت ثبت گردید.')
      } catch (err) {
         toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
         return console.error(err)
      }
   }

   const handleCalenderChange = (day: Date) => {
      const selectedDayIndex = day.getDay()

      if (selectedDayIndex == 5) return toast.warning('روز جمعه قابل انتخاب نمی‌باشد')
      else if (new Date(day) <= new Date())
         return toast.warning('تاریخ گذشته قابل انتخاب نمی‌باشد.')
      else if (
         workingDays.find(
            (workingDay) => workingDay.dayIndex == selectedDayIndex && workingDay.closed,
         )
      )
         return toast.warn('این روز تعطیل می‌باشد')
      else return setCalendarValue(new Date(day))
   }

   function formatTimeWithLeadingZeros(time: number) {
      const paddedTime = (time * 100).toString().padStart(4, '0')
      return `${paddedTime.slice(0, 2)}:${paddedTime.slice(2)}`
   }

   return (
      <div>
         <h1 className='mb-10 text-center text-4xl'>رزرو تاریخ و ساعت مراجعه</h1>

         <div className='grid grid-cols-2 gap-10'>
            <div>
               <CalendarProvider accentColor='#1e3a8a' locale='fa' round='x2'>
                  <Calendar
                     weekends={[6]}
                     defaultValue={calendarValue}
                     onChange={handleCalenderChange}
                  />
               </CalendarProvider>
            </div>
            <div>
               <div className='grid grid-cols-3 gap-5'>
                  {workingDays.map((day) => {
                     if (day.dayIndex !== calendarValue.getDay()) return

                     const eachSessionLength = 60

                     const sessions = (day.closeTime - day.openTime) / eachSessionLength

                     return Array.from({ length: sessions }, (_, index) => {
                        const sessionTime = day.openTime + index * eachSessionLength

                        const reservedBefore = appointments.some((appointment) => {
                           const year = calendarValue.getFullYear()
                           const month = calendarValue.getMonth()
                           const day = calendarValue.getDate()
                           const hour = Math.floor(sessionTime / 60)
                           const min = sessionTime % 60

                           const reserverdTime = new Date(year, month, day, hour, min)

                           if (
                              new Date(appointment.reservedDate).getTime() ==
                              reserverdTime.getTime()
                           ) {
                              return true
                           }
                        })

                        return (
                           <button
                              disabled={reservedBefore}
                              key={index}
                              className={`gap-3 rounded-md ${
                                 reservedBefore ? 'border-2 border-red-600' : ''
                              } ${
                                 timeValue == sessionTime
                                    ? 'bg-blue-900 text-white shadow-md'
                                    : 'bg-blue-100 text-slate-800'
                              } py-3 text-center`}
                              onClick={() => setTimeValue(sessionTime)}
                           >
                              <span className='text-base text-inherit'>
                                 {formatTimeWithLeadingZeros(sessionTime / eachSessionLength)}
                              </span>
                           </button>
                        )
                     })
                  })}
               </div>
            </div>
         </div>
         <div className='mt-10 flex justify-center'>
            <button onClick={handleSubmit} className='rounded-lg bg-blue-900 px-20 py-3 text-white'>
               نهایی کردن رزرو
            </button>
         </div>
      </div>
   )
}

export default Calender
