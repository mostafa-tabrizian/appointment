'use client'

import { IWorkingDay } from '@/models/workingDay'
import Switch from '@mui/material/Switch'
import { Form, Formik } from 'formik'
import { memo, useState } from 'react'
import { TimePicker } from 'zaman'

import updateWorkingDay from './updateWorkingDay'

const DetailForm = memo(({ workingDay }: { workingDay: IWorkingDay }) => {
   const [showSubmitButton, setShowSubmitButton] = useState(false)

   const MinToDate = (totalMin: number) => {
      const hour = Math.floor(totalMin / 60)
      const minutes = totalMin % 60
      const date = new Date()
      date.setHours(hour)
      date.setMinutes(minutes)

      return date
   }

   const handleSubmit = async (values: {
      openTime: number
      closeTime: number
      closed: boolean
   }) => {
      setShowSubmitButton(false)
      const toast = await import('react-toastify').then((mod) => mod.toast)
      toast.info('در حال ثبت بروزرسانی...')
      await updateWorkingDay({ _id: String(workingDay._id), ...values })
      toast.success('روز هفته با موفقیت به روز رسانی شد')
   }

   return (
      <Formik
         initialValues={{
            openTime: workingDay.openTime,
            closeTime: workingDay.closeTime,
            closed: workingDay.closed,
         }}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting }) => (
            <Form className='space-y-3'>
               <div className='grid grid-cols-5 items-center justify-between rounded-lg bg-slate-50 p-2 text-center'>
                  <input className='text-center' readOnly value={workingDay.dayNameFarsi} />
                  <TimePicker
                     inputClass='text-center'
                     defaultValue={MinToDate(values.openTime)}
                     onChange={(e) => {
                        setFieldValue('openTime', e.hour * 60 + e.minute)
                        setShowSubmitButton(true)
                     }}
                  />
                  <TimePicker
                     inputClass='text-center'
                     defaultValue={MinToDate(values.closeTime)}
                     onChange={(e) => {
                        setFieldValue('closeTime', e.hour * 60 + e.minute)
                        setShowSubmitButton(true)
                     }}
                  />
                  <Switch
                     className='mx-auto'
                     checked={values.closed}
                     name='closed'
                     color='success'
                     onChange={() => {
                        setFieldValue('closed', !values.closed)
                        setShowSubmitButton(true)
                     }}
                  />
                  {showSubmitButton ? (
                     <button type='submit'>
                        <svg
                           className='h-8 w-8 text-green-500'
                           viewBox='0 0 24 24'
                           fill='none'
                           stroke='currentColor'
                           strokeWidth='2'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           {' '}
                           <polyline points='9 11 12 14 22 4' />{' '}
                           <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
                        </svg>
                     </button>
                  ) : (
                     ''
                  )}
               </div>
            </Form>
         )}
      </Formik>
   )
})

DetailForm.displayName = 'DetailForm'

export default DetailForm
