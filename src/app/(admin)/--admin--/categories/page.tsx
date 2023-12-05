import CategoryNewInput from './components/create'
import DeleteButton from './components/delete'
import NameEdit from './components/nameEdit'
import Category from '@/models/category'
import Product from '@/models/product'
import dbConnect from '@/lib/dbConnect'

export const revalidate = 0

export const metadata = {
   title: 'اپوینت منت | پنل ادمین | دسته بندی ها',
   robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
         index: false,
         follow: false,
      },
   },
}

const getCategories = async () => {
   dbConnect()
   return await Category.find()
}

const getCategoryappointmentsCount = async () => {
   const categoriesProductCount: { [key: string]: number } = {}

   dbConnect()
   const appointments = await Product.find()

   appointments.map((product) => {
      const productCategory = product.category
      if (categoriesProductCount[productCategory]) {
         categoriesProductCount[productCategory] += 1
      } else {
         categoriesProductCount[productCategory] = 1
      }
   })

   return categoriesProductCount
}

const AdminCategories = async () => {
   const categories = await getCategories()
   const categoriesProductCount = await getCategoryappointmentsCount()

   return (
      <>
         <CategoryNewInput />

         <div className='rtl mt-6'>
            <div className='mb-3 grid grid-cols-6 items-center justify-between rounded-lg p-5 py-2 text-center'>
               <p className='col-span-4 flex'>نام</p>
               <p className='col-span-1'>محصولات</p>
            </div>

            <div className='space-y-3'>
               {categories.length ? (
                  categories.map((category) => {
                     const appointmentsLength = categoriesProductCount[category._id] | 0
                     return (
                        <div
                           key={category._id}
                           className='grid grid-cols-6 items-center justify-between rounded-lg bg-slate-50 p-2 text-center'
                        >
                           <NameEdit params={JSON.parse(JSON.stringify({ ...category }))} />
                           <p>{appointmentsLength}</p>
                           <DeleteButton
                              params={JSON.parse(
                                 JSON.stringify({
                                    _id: category._id,
                                    ableToDelete: appointmentsLength ? false : true,
                                 }),
                              )}
                           />
                        </div>
                     )
                  })
               ) : (
                  <h3 className='text-center'>هیچ دسته بندی ثبت نشده است</h3>
               )}
            </div>
         </div>
      </>
   )
}

export default AdminCategories
