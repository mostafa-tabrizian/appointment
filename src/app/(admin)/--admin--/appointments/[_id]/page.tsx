import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Product from '@/models/product'
import DetailProduct from '../components/detailForm'
import Category from '@/models/category'
import Factory from '@/models/factory'

const fetchData = async (_id: string) => {
   await dbConnect()

   let product

   if (_id !== 'new') {
      product = await Product.findOne({ _id })
   }
   const categories = await Category.find()
   const factories = await Factory.find({ active: true })

   return { product, categories, factories }
}

export const metadata = {
   title: 'اپوینت منت | ادمین | محصول',
}

const ProductPage = async ({ params: { _id } }: { params: { _id: string } }) => {
   const addingNewProduct = _id === 'new'

   try {
      const { product, categories, factories } = await fetchData(_id)

      return (
         <div className='relative mx-6 my-16'>
            <div className='mx-6 my-16 max-w-screen-xl space-y-10 md:mx-auto'>
               {product || addingNewProduct ? (
                  <div className='mx-auto max-w-xl'>
                     <Link href='/--admin--/appointments/new'>
                        <button className='fixed bottom-10 right-5 z-10 rounded-full border-2 border-red-500 bg-white p-3'>
                           <svg
                              className='h-6 w-6 text-red-500'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth='2'
                                 d='M12 4v16m8-8H4'
                              />
                           </svg>
                        </button>
                     </Link>

                     <DetailProduct
                        addingNewProduct={addingNewProduct}
                        product={addingNewProduct ? null : JSON.parse(JSON.stringify(product))}
                        categories={JSON.parse(JSON.stringify(categories))}
                        factories={JSON.parse(JSON.stringify(factories))}
                     />
                  </div>
               ) : (
                  <h1>آیتم پیدا نشد!</h1>
               )}
            </div>
         </div>
      )
   } catch (error) {
      console.error('Error fetching data:', error)
      return
   }
}

export default ProductPage
