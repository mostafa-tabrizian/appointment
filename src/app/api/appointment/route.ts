import authOptions from '@/lib/auth'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import Appointment, { IAppointment } from '@/models/appointment'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
   return NextResponse.json(await Appointment.find())
}

export async function POST(request: Request) {
   try {
      const { name, mobileNumber, description, reservedDate }: IAppointment = await request.json()


      const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ status: 403 })

      dbConnect()

      const appointmentExist = await Appointment.findOne({ name, reservedDate })
      if (appointmentExist) return NextResponse.json({
         _id: appointmentExist._id,
         message: 'appointment existed'
      })

      const appointment = await Appointment.create({
         name,
         mobileNumber,
         description,
         paid: false,
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
