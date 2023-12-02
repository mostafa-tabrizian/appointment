'use client'

import { memo } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { IProduct } from '@/models/product'

import { Switch } from '@mui/material'

import { ProductForm } from '@/formik/schema/validation'
import { ICategory } from '@/models/category'
import { IFactory } from '@/models/factory'

const DetailForm = memo(
   ({
      addingNewProduct,
      product,
      categories,
      factories,
   }: {
      addingNewProduct: boolean
      product: IProduct
      categories: ICategory[]
      factories: IFactory[]
   }) => {
      const router = useRouter()

      const handleSubmit = async (
         values: {
            active: boolean
            title: string
            category: string
            factory: string
            price: number
            length: number
            width: number
            thickness: number
            inStock: boolean
         },
         { resetForm }: { resetForm: () => void },
      ) => {
         try {
            toast.info('در حال ثبت اطلاعات محصول...')

            const payload = {
               _id: addingNewProduct ? null : product._id,
               ...values,
            }

            const res = await fetch('/api/--admin--/product', {
               method: addingNewProduct ? 'POST' : 'PATCH',
               body: JSON.stringify(payload),
            })

            const resData = await res.json()

            if (!res.ok) throw new Error()
            else if (resData.status == 500) {
               console.error(resData.message)
               return toast.error('خطا در برقراری ارتباط')
            }

            toast.success('اطلاعات محصول با موفقیت ثبت گردید.')

            if (addingNewProduct) resetForm()
            else router.refresh()
         } catch (err) {
            toast.error('خطا در برقراری ارتباط. لطفا مجدد تلاش کنید.')
            return console.error(err)
         }
      }

      const handleDelete = async () => {
         const toast = await import('react-toastify').then((mod) => mod.toast)

         try {
            toast.info('در حال حذف محصول...')

            const payload = {
               _id: product._id,
            }

            const res = await fetch('/api/--admin--/product', {
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
         }
      }

      return (
         <Formik
            initialValues={{
               active: addingNewProduct ? true : product.active,
               title: addingNewProduct ? '' : product.title,
               category: addingNewProduct ? '' : product.category,
               factory: addingNewProduct ? '' : product.factory,
               price: addingNewProduct ? 0 : product.price[product.price.length - 1].value,
               length: addingNewProduct ? 0 : product.length,
               width: addingNewProduct ? 0 : product.width,
               thickness: addingNewProduct ? 0 : product.thickness,
               inStock: addingNewProduct ? true : product.inStock,
            }}
            validationSchema={ProductForm}
            onSubmit={handleSubmit}
         >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => (
               <Form className='mt-6 space-y-5'>
                  <div className='space-y-1 text-right'>
                     <label htmlFor='title'>
                        <span className='text-slate-600'>عنوان محصول</span>
                     </label>
                     <input
                        name='title'
                        onChange={(e) => setFieldValue('title', e.target.value)}
                        value={values.title}
                        className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                        type='text'
                     />
                     <p className='text-xs font-normal text-slate-700'>
                        برای سئوی بهتر لطفا عنوان کامل را وارد کنید. برای مثال:{' '}
                        <span className='font-bold text-slate-700'>
                           ورق روغنی ۴ میل ابعاد ۲۰۰۰x۱۰۰۰
                        </span>
                     </p>
                  </div>

                  {errors.title && touched.title ? (
                     <p className='text-sm text-red-500'>{errors.title}</p>
                  ) : (
                     ''
                  )}

                  <div>
                     <div className='space-y-1 text-right'>
                        <label htmlFor='category'>
                           <span className='text-slate-600'>دسته بندی</span>
                        </label>
                        <select
                           disabled={isSubmitting}
                           className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                           value={values.category}
                           onChange={(e) => {
                              setFieldValue('category', e.target.value)
                           }}
                        >
                           <option value='' defaultChecked>
                              --
                           </option>
                           {categories.map((category, idx) => {
                              return (
                                 <option key={idx} value={category._id}>
                                    {category.name}
                                 </option>
                              )
                           })}
                        </select>
                     </div>

                     {errors.category && touched.category ? (
                        <p className='text-sm text-red-500'>{errors.category}</p>
                     ) : (
                        ''
                     )}
                  </div>

                  <div>
                     <div className='space-y-1 text-right'>
                        <label htmlFor='factory'>
                           <span className='text-slate-600'>کارخانه</span>
                        </label>
                        <select
                           disabled={isSubmitting}
                           className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                           value={values.factory}
                           onChange={(e) => {
                              setFieldValue('factory', e.target.value)
                           }}
                        >
                           <option value='' defaultChecked>
                              --
                           </option>
                           {factories.map((factory, idx) => {
                              return (
                                 <option key={idx} value={factory._id}>
                                    {factory.name}
                                 </option>
                              )
                           })}
                        </select>
                     </div>

                     {errors.factory && touched.factory ? (
                        <p className='text-sm text-red-500'>{errors.factory}</p>
                     ) : (
                        ''
                     )}
                  </div>

                  <div className='grid grid-cols-2 gap-5'>
                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='price'>
                              <span className='text-slate-600'>قیمت به تومان</span>
                           </label>
                           <input
                              name='price'
                              onChange={(e) => setFieldValue('price', e.target.value)}
                              value={values.price}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                           <p className='text-xs font-normal text-slate-700'>
                              {/* @ts-ignore */}
                              {parseInt(values.price).toLocaleString('fa')} تومان
                           </p>
                        </div>

                        {errors.price && touched.price ? (
                           <p className='text-sm text-red-500'>{errors.price}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='thickness'>
                              <span className='text-slate-600'>ضخامت به میلی متر</span>
                           </label>
                           <input
                              name='thickness'
                              onChange={(e) => setFieldValue('thickness', e.target.value)}
                              value={values.thickness}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                        </div>

                        {errors.thickness && touched.thickness ? (
                           <p className='text-sm text-red-500'>{errors.thickness}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='length'>
                              <span className='text-slate-600'>طول به میلی متر</span>
                           </label>
                           <input
                              name='length'
                              onChange={(e) => setFieldValue('length', e.target.value)}
                              value={values.length}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                        </div>

                        {errors.length && touched.length ? (
                           <p className='text-sm text-red-500'>{errors.length}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='space-y-1 text-right'>
                           <label htmlFor='width'>
                              <span className='text-slate-600'>عرض به میلی متر</span>
                           </label>
                           <input
                              name='width'
                              onChange={(e) => setFieldValue('width', e.target.value)}
                              value={values.width}
                              className='w-full rounded-lg border-2 border-slate-200 bg-slate-100 p-2 text-sm'
                              type='number'
                           />
                        </div>

                        {errors.width && touched.width ? (
                           <p className='text-sm text-red-500'>{errors.width}</p>
                        ) : (
                           ''
                        )}
                     </div>

                     <div>
                        <div className='flex items-center gap-5'>
                           <span className='text-slate-600'>محصول نمایش داده شود</span>

                           <Switch
                              checked={values.active}
                              name='active'
                              color='success'
                              onChange={() => setFieldValue('active', !values.active)}
                           />
                        </div>

                        {!addingNewProduct && (
                           <span className='!my-0 flex justify-end text-right text-[.65rem] text-rose-400'>
                              میتوانید به جای حذف محصول آن را مخفی کنید
                           </span>
                        )}
                     </div>

                     <div className='flex items-center gap-5'>
                        <span className='text-slate-600'>محصول موجود است</span>

                        <Switch
                           checked={values.inStock}
                           name='inStock'
                           color='success'
                           onChange={() => setFieldValue('inStock', !values.inStock)}
                        />
                     </div>
                  </div>

                  <button
                     type='submit'
                     disabled={isSubmitting}
                     className='w-full rounded-lg border-2 border-green-600 transition-shadow hover:shadow-md hover:shadow-green-600/40'
                  >
                     {isSubmitting ? (
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
                        'ذخیره'
                     )}
                  </button>

                  {addingNewProduct ? (
                     ''
                  ) : (
                     <button
                        type='button'
                        disabled={isSubmitting}
                        onClick={handleDelete}
                        className='w-full rounded-lg border-2 border-rose-300 transition-shadow hover:shadow-md hover:shadow-rose-300/40'
                     >
                        {isSubmitting ? (
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
                  )}
               </Form>
            )}
         </Formik>
      )
   },
)

DetailForm.displayName = 'DetailForm'

export default DetailForm
