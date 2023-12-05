import { NextRequest, NextResponse } from 'next/server'

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
   const checkAppointmentAvalibility = async (reservedAt: Date) => {

      const appointmentTimeExist = await Appointment.findOne({ reservedAt })

      if (appointmentTimeExist) {
         const reservedBefore = true
         const reservePaid = Boolean(appointmentTimeExist.paid)
         let reservePaymentExpired = false

         const reservedAtToDate = new Date(reservedAt)
         const nowDate = new Date().getTime()
         const reservePast = reservedAtToDate.getTime() <= nowDate


         if (!reservePaid) {
            const thirteenMin = 13 * 60 * 1000
            reservePaymentExpired =
               new Date(appointmentTimeExist.updatedAt).getTime() + thirteenMin <=
               new Date().getTime()
         }

         if (reservePast || (reservedBefore && (reservePaid || !reservePaymentExpired))) return true
         else return false
      }

   }

   try {
      const { name, mobileNumber, description, reservedAt }: IAppointment = await request.json()

      dbConnect()

      const appointmentNotAvailable = await checkAppointmentAvalibility(reservedAt)
      if (appointmentNotAvailable) return NextResponse.json({ status: 422, message: 'Reserved before' })

      const appointmentExist = await Appointment.findOne({ name, reservedAt })
      if (appointmentExist) {
         appointmentExist.updatedAt = new Date()
         await appointmentExist.save()

         return NextResponse.json({
            _id: appointmentExist._id,
            message: 'appointment existed'
         })
      }

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
