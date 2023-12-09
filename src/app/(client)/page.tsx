// import OurFeatures from './components/ourFeatures'
// import NewestCourses from './components/newestCourses'
// import CommentSection from './components/commentSection'
// import OurWorkHistory from './components/ourWorkHistory'
// import RoadMap from './components/roadMap'
import dbConnect from '@/lib/dbConnect'
import Reserve from './components/reserve'
import WorkingDays from '@/models/workingDay'
import Hero from './components/hero'

export const metadata = {
   title: 'اپوینت منت | رزرو تاریخ و ساعت مراجعه',
   description: '#',
}

async function Home() {
   await dbConnect()

   const workingDays = await WorkingDays.find()

   return (
      <div className='mb-16 space-y-16'>
         <Hero />

         <Reserve workingDays={JSON.parse(JSON.stringify(workingDays))} />

         {/* <OurFeatures />

         <NewestCourses />

         <CommentSection />

         <OurWorkHistory /> */}

         {/* <RoadMap /> */}
      </div>
   )
}

export default Home
