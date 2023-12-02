'use client'

import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import { CategoryValidation } from '@/formik/schema/validation'

const NameEdit = ({ params }: { params: { _doc: { _id: string; name: string } } }) => {
   const name = params._doc.name.charAt(0).toUpperCase() + params._doc.name.slice(1)

   const handleSubmit = async ({ name }: { name: string }) => {
      toast.info('در حال ثبت تغییرات...')

      const payload = {
         _id: params._doc._id,
         name: name.trim(),
      }

      try {
         const res = await fetch('/api/--admin--/category', {
            method: 'PATCH',
            body: JSON.stringify(payload),
         })

         const resData = await res.json()

         if (!res.ok) throw new Error()
         else if (resData.status == 11000) {
            return toast.warning('نام دسته بندی تکراری می‌باشد')
         } else if (resData.status == 500) {
            console.error(resData.message)
            return toast.error('خطا در برقراری ارتباط')
         }

         return toast.success('نام دسته بندی با موفقیت تغییر یافت')
      } catch (err) {
         toast.error('در تغییر نام دسته بندی خطایی رخ داد')
         return console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{ name }}
         validationSchema={CategoryValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched, submitForm }) => (
            <Form className='rtl col-span-4 w-full items-start'>
               <div>
                  <div className='ml-2 space-y-1 text-right'>
                     <input
                        disabled={isSubmitting}
                        placeholder='نام'
                        name='name'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        value={values.name}
                        className='w-full bg-transparent text-sm outline-none'
                        type='text'
                        onKeyDown={(e) => {
                           if (e.key == 'Enter') submitForm()
                        }}
                     />
                  </div>

                  {errors.name && touched.name ? (
                     <p className='text-right text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>
            </Form>
         )}
      </Formik>
   )
}

export default NameEdit
