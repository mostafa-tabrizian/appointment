import authOptions from '@/lib/auth'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import Appointment, { IAppointment } from '@/models/appointment'
import dbConnect from '@/lib/dbConnect'

export async function GET(req: NextRequest) {
   const date: Date = new Date(parseInt(req.nextUrl.searchParams.get('date') as string))

   const year = date.getFullYear()
   const month = date.getMonth()
   const day = date.getDate()

   const from = new Date(year, month, day, 5)
   const to = new Date(year, month, day, 23, 59)

   return NextResponse.json(await Appointment.find({ reservedAt: { $gte: from, $lte: to } }))
}

export async function POST(request: Request) {
   try {
      const { name, mobileNumber, description, reservedAt }: IAppointment = await request.json()


      const session: { _doc: { _id: string } } | null = await getServerSession(authOptions)
      if (!session) return NextResponse.json({ status: 403 })

      dbConnect()

      const appointmentExist = await Appointment.findOne({ name, reservedAt })
      if (appointmentExist) return NextResponse.json({
         _id: appointmentExist._id,
         message: 'appointment existed'
      })

      const appointment = await Appointment.create({
         name,
         mobileNumber,
         description,
         paid: false,
         reservedAt,
      })

      return NextResponse.json({
         _id: appointment._id,
         message: 'appointment submitted'
      })
   } catch (err) {
      return NextResponse.json({ status: 500 })
   }
}
