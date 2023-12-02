import authOptions from '@/lib/auth'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import Appointment, { IAppointment } from '@/models/appointment'
import dbConnect from '@/lib/dbConnect'

// export async function GET() {
//    const session: { _doc: { role: string } } | null = await getServerSession(authOptions)
//    if (!session || session?._doc.role !== 'ادمین') return NextResponse.json({ status: 403 })

//    await dbConnect()
//    const appointments = await Appointment.find({}).populate('user', 'name mobileNumber').exec()

//    return NextResponse.json(appointments)
// }

export async function POST(request: Request) {
   try {
      const { name, mobileNumber, description, paid, reservedDate }: IAppointment = await request.json()


      const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ status: 403 })

      dbConnect()
      const appointment = await Appointment.create({
         name,
         mobileNumber,
         description,
         paid,
         reservedDate,
      })

      return NextResponse.json({
         _id: appointment._id,
         message: 'appointment submitted'
      })
   } catch (err) {
      return NextResponse.json({ status: 500 })
   }
}
