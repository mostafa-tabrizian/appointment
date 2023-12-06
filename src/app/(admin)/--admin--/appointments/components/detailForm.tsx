'use client'

import { memo, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { IAppointment } from '@/models/appointment'

import { Switch } from '@mui/material'

const DetailForm = memo(
   ({
      // addingNewAppointment,
      appointment,
   }: {
      // addingNewAppointment: boolean
      appointment: IAppointment
   }) => {
      const router = useRouter()

      const [loading, setLoading] = useState(false)

      // const handleSubmit = async (
      //    values: {
      //       active: boolean
      //       title: string
      //       category: string
      //       factory: string
      //       price: number
      //       length: number
      //       width: number
      //       thickness: number
      //       inStock: boolean
      //    },
      //    { resetForm }: { resetForm: () => void },
      // ) => {
      //    try {
      //       setLoading(true)
      //       toast.info('در حال ثبت اطلاعات محصول...')

      //       const payload = {
      //          _id: addingNewAppointment ? null : appointment._id,
      //          ...values,
      //       }

      //       const res = await fetch('/api/--admin--/appointment', {
      //          method: addingNewAppointment ? 'POST' : 'PATCH',
      //          body: JSON.stringify(payload),
      //       })

      //       const resData = await res.json()

      //       if (!res.ok) throw new Error()
      //       else if (resData.status == 500) {
      //          console.error(resData.message)
      //          return toast.error('خطا در برقراری ارتباط')
      //       }

      //       toast.success('اطلاعات محصول با موفقیت ثبت گردید.')

      //       if (addingNewAppointment) resetForm()
      //       else router.refresh()
      //    } catch (err) {
      //       toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
      //       return console.error(err)
      //    } finally {
      //       setLoading(false)
      //    }
      // }

      const handleDelete = async () => {
         const toast = await import('react-toastify').then((mod) => mod.toast)

         try {
            setLoading(true)
            toast.info('در حال حذف محصول...')

            const payload = {
               _id: appointment._id,
            }

            const res = await fetch('/api/--admin--/appointment', {
               method: 'DELETE',
               body: JSON.stringify(payload),
            })

            const resData = await res.json()

            if (!res.ok) throw new Error()
            else if (resData.status == 500) {
               console.error(resData.message)
               return toast.error('خطا در برقراری ارتباط')
            }

            toast.success('محصول با موفقیت حذف گردید.')
            fetch('/api/--admin--/revalidate?path=/')
            router.push('/--admin--/appointments')
            router.refresh()
         } catch (err) {
            toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
            return console.error(err)
         } finally {
            setLoading(false)
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

               <div>
                  <div className='flex items-center gap-5'>
                     <span className='text-slate-600'>رزرو فعال است</span>

                     <Switch
                        // checked={appointment.active}
                        name='active'
                        color='success'
                     />
                  </div>

                  {/* {!addingNewAppointment && ( */}
                  <span className='!my-0 flex justify-start text-right text-[.65rem] text-rose-400'>
                     میتوانید به جای حذف رزرو آن را مخفی کنید تا در تقویم ثبت رزرو اعمال نشود
                  </span>
                  {/* )} */}
               </div>
            </div>

            <div className='w-full gap-5 space-y-3 rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'>
               <p>توضیحات: </p>
               <p>{appointment.description || 'توضیحاتی ثبت نشده است.'}</p>
            </div>

            {/* {addingNewAppointment ? (
               ''
            ) : ( */}
            <button
               type='button'
               onClick={handleDelete}
               className='w-full rounded-lg border-2 border-rose-300 transition-shadow hover:shadow-md hover:shadow-rose-300/40'
            >
               {loading ? (
                  <svg
                     className='mx-auto h-7 w-7 animate-spin text-green-700'
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
               ) : (
                  'حذف'
               )}
            </button>
            {/* )} */}
         </div>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
