import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import User, { IUser } from '@/models/user'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
   const session: { _doc: { role: string } } | null = await getServerSession(authOptions)
   if (!session || session?._doc.role !== 'ادمین') return NextResponse.json({ status: 403})

   await dbConnect()
   const users: IUser[] = await User.find()

   const monthlyRegister: { date: string; value: number }[] = []

   users.map((user) => {
      const yearRegister = user.createdAt.getFullYear()
      const monthddRegister = user.createdAt.getMonth() + 1
      const userRegister = `${yearRegister}/${monthddRegister}`

      let dataIncluded = false

      monthlyRegister.map((register) => {
         if (register.date == userRegister) {
            register.value += 1
            dataIncluded = true
            return
         }
      })

      if (!dataIncluded) {
         monthlyRegister.push({
            date: userRegister,
            value: 1,
         })
      }
   })

   return NextResponse.json({
      total: users.length,
      monthlyRegister: monthlyRegister.reverse(),
   })
}
