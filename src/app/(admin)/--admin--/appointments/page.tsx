import dbConnect from '@/lib/dbConnect'
import Appointment from '@/models/appointment'

import Link from 'next/link'

import AppointmentsTable from './components/appointmentsTable'

const getAppointments = async () => {
   dbConnect()
   return await Appointment.find()
}

export const revalidate = 0

export const metadata = {
   title: 'اپوینت منت | پنل ادمین | محصولات',
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

const AdminAppointments = async () => {
   const appointments = (await getAppointments()).reverse()

   return (
      <>
         <Link href='/--admin--/appointments/new'>
            <button className='fixed bottom-24 right-5 z-10 rounded-full bg-[#568deb] p-3'>
               <svg
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='1'
                     d='M12 4v16m8-8H4'
                  />
               </svg>
            </button>
         </Link>
         <AppointmentsTable appointments={JSON.parse(JSON.stringify(appointments))} />
      </>
   )
}

export default AdminAppointments
