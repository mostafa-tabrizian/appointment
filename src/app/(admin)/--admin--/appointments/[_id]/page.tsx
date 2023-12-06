import Link from 'next/link'

import dbConnect from '@/lib/dbConnect'
import Appointment from '@/models/appointment'
import DetailAppointment from '../components/detailForm'

const fetchData = async (_id: string) => {
   await dbConnect()

   let appointment

   if (_id !== 'new') appointment = await Appointment.findOne({ _id })

   return { appointment }
}

export const metadata = {
   title: 'اپوینت منت | ادمین | محصول',
}

const AppointmentPage = async ({ params: { _id } }: { params: { _id: string } }) => {
   // const addingNewAppointment = _id === 'new'

   try {
      const { appointment } = await fetchData(_id)

      return (
         <div className='relative mx-6 my-16'>
            <div className='mx-6 my-16 max-w-screen-xl space-y-10 md:mx-auto'>
               {appointment ? ( // || addingNewAppointment
                  <div className='mx-auto max-w-xl'>
                     {/* <Link href='/--admin--/appointments/new'>
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
                     </Link> */}

                     <DetailAppointment
                        // addingNewAppointment={addingNewAppointment}
                        appointment={
                           JSON.parse(JSON.stringify(appointment)) // addingNewAppointment ? null :
                        }
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

export default AppointmentPage
