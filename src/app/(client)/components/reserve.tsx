'use client'

import { IAppointment } from '@/models/appointment'
import { IWorkingDay } from '@/models/workingDays'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Calendar, CalendarProvider } from 'zaman'
import Dialog from '@mui/material/Dialog'
import { Formik, Form } from 'formik'
import { AppointmentValidation } from '@/formik/schema/validation'
import FormikInput from '@/formik/input'
import FormikTextarea from '@/formik/textarea'

import useSWR from 'swr'

const Reserve = ({ workingDays }: { workingDays: IWorkingDay[] }) => {
   const [calendarValue, setCalendarValue] = useState(new Date())
   const [timeValue, setTimeValue] = useState(0)
   const [detailForm, setDetailForm] = useState(false)

   // @ts-ignore
   const fetcher = (...args) => fetch(...args).then((res) => res.json())

   const {
      data: appointments,
      isLoading: isLoadingAppointments,
   }: {
      data: IAppointment[]
      isLoading: boolean
   } = useSWR(`/api/appointment?date=${calendarValue.getTime()}`, fetcher)

   const handlePayment = async (name: string, mobileNumber: string, appointmentId: string) => {
      toast.info('در حال انتقال به درگاه پرداخت...')

      try {
         const res = await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify({
               name,
               mobileNumber,
               appointmentId,
            }),
         })

         const resData = await res.json()
         const zarinpalAuthority = resData.authority

         if (zarinpalAuthority) {
            window.location.href = `https://www.zarinpal.com/pg/StartPay/${zarinpalAuthority}`
         }
      } catch (err) {
         toast.error('در ایجاد درگاه پرداخت خطایی رخ داد. لطفا مجدد تلاش کنید.')
         console.error('Zarinpal Error: ', err)
         return null
      }
   }

   const handleSubmit = async (
      {
         name,
         mobileNumber,
         description,
      }: {
         name: string
         mobileNumber: string
         description: string
      },
      { resetForm }: { resetForm: () => void },
   ) => {
      const year = calendarValue.getFullYear()
      const month = calendarValue.getMonth()
      const day = calendarValue.getDate()
      const hour = Math.floor(timeValue / 60)
      const min = timeValue % 60

      const reservedAt = new Date(year, month, day, hour, min)

      try {
         toast.info('در حال ثبت رزرو...')

         const res = await fetch('/api/appointment', {
            method: 'POST',
            body: JSON.stringify({
               name,
               mobileNumber,
               description,
               reservedAt,
            }),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 422) {
            return toast.warn('این ساعت و تاریخ رزرو شده است.')
         } else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         await handlePayment(name, mobileNumber, resData._id)

         setDetailForm(false)
         resetForm()
      } catch (err) {
         toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
         return console.error(err)
      }
   }

   const pureDate = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()

      return new Date(year, month, day)
   }

   const handleCalenderChange = (day: Date) => {
      const selectedDayIndex = day.getDay()

      if (selectedDayIndex == 5) return toast.warning('روز جمعه قابل انتخاب نمی‌باشد')
      else if (pureDate(day) < pureDate(new Date()))
         return toast.warning('تاریخ گذشته قابل انتخاب نمی‌باشد.')
      else if (
         workingDays.find(
            (workingDay) => workingDay.dayIndex == selectedDayIndex && workingDay.closed,
         )
      )
         return toast.warn('این روز تعطیل می‌باشد')
      else return setCalendarValue(new Date(day))
   }

   function formatTimeWithLeadingZeros(hour: number, min: number) {
      const hourFormat = hour.toString().padStart(2, '0')
      const minuteFormat = min.toString().padStart(2, '0')
      return `${hourFormat}:${minuteFormat}`
   }

   const handleDateTimeSubmit = () => {
      if (!timeValue) return toast.warn('لطفا ساعت رزرو را انتخاب کنید')

      setDetailForm(true)
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
               {isLoadingAppointments ? (
                  <div className='col-span-4 grid h-full items-center justify-center'>
                     <svg
                        className='mx-auto my-1 h-12 w-12 animate-spin text-blue-500'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                     >
                        <circle
                           className='opacity-25'
                           cx='12'
                           cy='12'
                           r='10'
                           stroke='currentColor'
                           strokeWidth='4'
                        ></circle>
                        <path
                           className='opacity-75'
                           fill='currentColor'
                           d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                     </svg>
                  </div>
               ) : (
                  <div className='grid grid-cols-3 gap-5'>
                     {workingDays.map((day) => {
                        if (day.dayIndex !== calendarValue.getDay()) return
                        if (day.closed)
                           return (
                              <div className='col-span-3 w-full rounded-md bg-blue-100 py-3 text-center'>
                                 <span className='text-lg text-slate-800'>امروز تعطیل می‌باشد</span>
                              </div>
                           )

                        const eachSessionLengthInMin = 60

                        const sessionsNumber = Math.round(
                           (day.closeTime - day.openTime) / eachSessionLengthInMin + 1,
                        )

                        return Array.from({ length: sessionsNumber }, (_, index) => {
                           const sessionTimeInMin = day.openTime + index * eachSessionLengthInMin

                           let reservePaid = false
                           let reservePaymentExpired = false
                           let reservePast = false
                           let reservedBefore = false

                           const appointment = appointments?.find((each) => {
                              const calendarYear = calendarValue.getFullYear()
                              const calendarMonth = calendarValue.getMonth()
                              const calendarDay = calendarValue.getDate()
                              const sessionStartHour = Math.floor(sessionTimeInMin / 60)
                              const sessionStartMin = sessionTimeInMin % 60

                              const reserveFullDate = new Date(
                                 calendarYear,
                                 calendarMonth,
                                 calendarDay,
                                 sessionStartHour,
                                 sessionStartMin,
                              )

                              if (new Date(reserveFullDate).getTime() <= new Date().getTime())
                                 return (reservePast = true)

                              if (
                                 new Date(each.reservedAt).getTime() == reserveFullDate.getTime()
                              ) {
                                 return each
                              }
                           })

                           if (!reservePast && appointment) {
                              reservedBefore = true
                              reservePaid = Boolean(appointment.paid)

                              if (!reservePaid) {
                                 const thirteenMin = 13 * 60 * 1000
                                 reservePaymentExpired =
                                    new Date(appointment.updatedAt).getTime() + thirteenMin <=
                                    new Date().getTime()
                              }
                           }

                           return (
                              <button
                                 disabled={
                                    reservePast ||
                                    (reservedBefore && (reservePaid || !reservePaymentExpired))
                                 }
                                 key={index}
                                 className={`gap-3 rounded-md 
                                    ${reservePast ? 'line-through opacity-50' : ''}
                                    ${
                                       reservedBefore && reservePaid
                                          ? 'border-2 border-red-600'
                                          : ''
                                    }
                                    ${
                                       reservedBefore && !reservePaid && !reservePaymentExpired
                                          ? 'border-2 border-yellow-600'
                                          : ''
                                    }
                                    ${
                                       timeValue == sessionTimeInMin
                                          ? 'bg-blue-900 text-white shadow-md'
                                          : 'bg-blue-100 text-slate-800'
                                    }
                                    py-3 text-center`}
                                 onClick={() => setTimeValue(sessionTimeInMin)}
                              >
                                 <span className='text-base text-inherit'>
                                    {formatTimeWithLeadingZeros(
                                       Math.floor(sessionTimeInMin / 60),
                                       sessionTimeInMin % 60,
                                    )}
                                 </span>
                              </button>
                           )
                        })
                     })}
                  </div>
               )}
            </div>
         </div>
         <div className='mt-10 flex justify-center'>
            <button
               onClick={handleDateTimeSubmit}
               className='rounded-lg bg-blue-900 px-20 py-3 text-white'
            >
               این تاریخ و ساعت خوبه
            </button>
         </div>

         <Dialog onClose={() => setDetailForm(false)} open={detailForm}>
            <div className='w-96 space-y-5 p-5 text-center'>
               <div className='flex gap-5'>
                  <svg
                     className='h-16 w-16 text-green-500'
                     width='24'
                     height='24'
                     viewBox='0 0 24 24'
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                  >
                     {' '}
                     <path d='M12 20h9' />{' '}
                     <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
                  </svg>
                  <div className='text-right'>
                     <h1>جزئیات رزرو</h1>
                     <span className='font-semibold'>لطفا اطلاعات رزرو کننده رو وارد کنید</span>
                  </div>
               </div>
               <Formik
                  initialValues={{
                     name: '',
                     mobileNumber: '',
                     description: '',
                  }}
                  validationSchema={AppointmentValidation}
                  onSubmit={handleSubmit}
               >
                  {({ isSubmitting }) => (
                     <Form className='space-y-3'>
                        <FormikInput
                           placeholder='نام و نام خانوادگی'
                           name='name'
                           type='text'
                           label={undefined}
                        />

                        <FormikInput
                           placeholder='شماره تماس'
                           name='mobileNumber'
                           type='text'
                           label={undefined}
                        />

                        <FormikTextarea
                           placeholder='اگر توضیحاتی دارید لطفا آن ها را وارد کنید'
                           name='description'
                           label={undefined}
                        />

                        <div className='grid grid-cols-4 gap-3'>
                           {isSubmitting ? (
                              <div className='col-span-4 rounded bg-green-500'>
                                 <svg
                                    className='mx-auto my-1 h-6 w-6 animate-spin text-white'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                 >
                                    <circle
                                       className='opacity-25'
                                       cx='12'
                                       cy='12'
                                       r='10'
                                       stroke='currentColor'
                                       strokeWidth='4'
                                    ></circle>
                                    <path
                                       className='opacity-75'
                                       fill='currentColor'
                                       d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                    ></path>
                                 </svg>
                              </div>
                           ) : (
                              <>
                                 <button
                                    type='submit'
                                    className='col-span-3 w-full rounded bg-green-500 py-1 text-white'
                                 >
                                    پرداخت و ثبت نهایی
                                 </button>
                                 <button
                                    type='button'
                                    onClick={() => setDetailForm(false)}
                                    className='w-full rounded bg-slate-300 py-1'
                                 >
                                    لغو
                                 </button>
                              </>
                           )}
                        </div>
                     </Form>
                  )}
               </Formik>
            </div>
         </Dialog>
      </div>
   )
}

export default Reserve
