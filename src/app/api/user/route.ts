import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import User, { IUser } from '@/models/user'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)

   if (!session) return NextResponse.json({ status: 403 })

   await dbConnect()
   const user = await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }, 'name').exec()
      .then((res: IUser) => res)

   return NextResponse.json(user)
}

export async function PATCH(request: Request) {
   const { name }: { name: string } = await request.json()

   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)
   if (!session) return NextResponse.json({ status: 403 })

   try {
      await dbConnect()
      const user = await User.findOneAndUpdate(
         { mobileNumber: session._doc.mobileNumber },
         { name: name }
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...filteredUser } = user._doc

      return NextResponse.json(filteredUser)
   } catch (err) {
      console.error('err api/user', err)

      return NextResponse.json({
         statue: 500,
         undefined,
      })
   }
}
