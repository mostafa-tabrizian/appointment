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
   try {
      const { appointment } = await fetchData(_id)

      return (
         <div className='relative mx-6 my-16'>
            <div className='mx-6 my-16 max-w-screen-xl space-y-10 md:mx-auto'>
               {appointment ? (
                  <div className='mx-auto max-w-xl'>
                     <DetailAppointment appointment={JSON.parse(JSON.stringify(appointment))} />
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
