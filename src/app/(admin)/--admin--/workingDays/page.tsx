import WorkingDay from '@/models/workingDay'
import dbConnect from '@/lib/dbConnect'
import DetailForm from './components/detailForm'

export const revalidate = 0

export const metadata = {
   title: 'اپوینت منت | پنل ادمین | روز هفته ای ها',
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

const getWorkingDays = async () => {
   dbConnect()
   return await WorkingDay.find()
}

const AdminWorkingDays = async () => {
   const workingDays = await getWorkingDays()

   return (
      <div className='rtl mt-6'>
         <div className='mb-3 grid grid-cols-5 items-center justify-between rounded-lg p-5 py-2 text-center'>
            <p className=''>روز هفته</p>
            <p className=''>ساعت باز</p>
            <p className=''>ساعت بسته</p>
            <p className=''>تعطیل</p>
         </div>
         <div className='space-y-3'>
            {workingDays.length ? (
               workingDays.map((workingDay, idx) => {
                  return (
                     <div key={idx}>
                        <DetailForm workingDay={JSON.parse(JSON.stringify(workingDay))} />
                     </div>
                  )
               })
            ) : (
               <h3 className='text-center'>هیچ روز هفته ای ثبت نشده است</h3>
            )}
         </div>
      </div>
   )
}

export default AdminWorkingDays
