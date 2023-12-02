'use client'

import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import { CategoryValidation } from '@/formik/schema/validation'

const CategoryNewInput = () => {
   const router = useRouter()

   const handleSubmit = async (
      { name }: { name: string },
      { resetForm }: { resetForm: () => void },
   ) => {
      toast.info('در حال ثبت دسته بندی جدید...')

      const payload = { name: name.trim() }

      try {
         const res = await fetch('/api/--admin--/category', {
            method: 'POST',
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

         toast.success('دسته بندی با موفقیت ثبت گردید')
         resetForm()
         return router.refresh()
      } catch (err) {
         toast.warning('در ثبت دسته بندی خطایی رخ داد')
         return console.error(err)
      }
   }

   return (
      <Formik
         initialValues={{
            name: '',
         }}
         validationSchema={CategoryValidation}
         onSubmit={handleSubmit}
      >
         {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className='rtl flex w-full items-start'>
               <div className='w-full space-y-1 text-right'>
                  <input
                     placeholder='نام محصول را وارد کنید...'
                     name='name'
                     onChange={(e) => setFieldValue('name', e.target.value)}
                     value={values.name}
                     className='rtl w-full rounded-lg border-2 border-slate-100 bg-slate-50 p-2 text-sm font-normal'
                     type='text'
                  />

                  {errors.name && touched.name ? (
                     <p className='text-right text-sm text-red-500'>{errors.name}</p>
                  ) : (
                     ''
                  )}
               </div>

               <button type='submit' className='w-48 md:w-36'>
                  {isSubmitting ? (
                     <svg
                        className='h-7 w-7 animate-spin text-slate-700'
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
                     <span className='rounded-lg border-2 border-slate-100 bg-slate-50 px-4 py-2'>
                        ثبت محصول
                     </span>
                  )}
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default CategoryNewInput
