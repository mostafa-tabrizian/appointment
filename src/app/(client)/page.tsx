// import OurFeatures from './components/ourFeatures'
// import NewestCourses from './components/newestCourses'
// import CommentSection from './components/commentSection'
// import OurWorkHistory from './components/ourWorkHistory'
// import RoadMap from './components/roadMap'
import dbConnect from '@/lib/dbConnect'
import Calender from './components/calender'
import Appointment from '@/models/appointment'
import WorkingDays from '@/models/workingDays'
// import Hero from './components/hero'

export const metadata = {
   title: 'اپوینت‌منت | رزرو تاریخ و ساعت مراجعه',
   description: '#',
}

async function Home() {
   await dbConnect()

   const appointments = await Appointment.find()
   const workingDays = await WorkingDays.find()

   // await Appointment.create({
   //    name: 'مصطفی تبریزیان',
   //    mobileNumber: '09128521769',
   //    description: 'توضیحات رزرو من',
   //    paid: true,
   //    reservedDate: new Date(2023, 11, 2, 10, 0),
   // })

   return (
      <div className='mb-16 mt-24 space-y-16'>
         {/* <Hero /> */}

         <Calender
            workingDays={JSON.parse(JSON.stringify(workingDays))}
            appointments={JSON.parse(JSON.stringify(appointments))}
         />

         {/* <OurFeatures />

         <NewestCourses />

         <CommentSection />

         <OurWorkHistory /> */}

         {/* <RoadMap /> */}
      </div>
   )
}

export default Home
