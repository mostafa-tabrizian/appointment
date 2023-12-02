import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import authOptions from '@/lib/auth'
import Course, { ICourse } from '@/models/workingDays'
import dbConnect from '@/lib/dbConnect'

export async function POST(req: Request) {
   const payload: {
      courseId: string
      title: string
      positivePoints: string[]
      negativePoints: string[]
      description: string
      rate: number
      suggestion: boolean | null
   } = await req.json()

   const {
      courseId,
      title,
      positivePoints,
      negativePoints,
      description,
      rate,
      suggestion,
   } = payload

   const session: { _doc: { _id: string; avatar: string; name: string } } | null =
      await getServerSession(authOptions)
   if (!session) return NextResponse.json({ status: 403 })

   await dbConnect()
   const course = await Course.findOne({
      _id: courseId,
   })
      .exec()
      .then((res: ICourse) => res)

   // @ts-ignore
   course.comments.push({
      user: {
         id: session._doc._id,
         avatar: session._doc.avatar,
         name: session._doc.name,
      },
      title: title,
      positivePoints: positivePoints,
      negativePoints: negativePoints,
      body: description,
      rate: rate,
      suggestion: suggestion,
      createdAt: new Date(),
   })

   // @ts-ignore
   course.save()

   return NextResponse.json({ message: 'comment submitted.' })
}

// export async function PATCH(request: Request) {
//     const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)
//     const payload = await request.json()

//     if (!session) return

//     try {
//         const user = await User.findOneAndUpdate(
//             { mobileNumber: session._doc.mobileNumber },
//             { name: payload.name }
//         )

//         const { password: _, ...filteredUser } = user._doc

//         return NextResponse.json(filteredUser)
//     } catch (err) {
//         console.error('err api/user', err)

//         return NextResponse.json({
//             statue: 500,
//             undefined,
//         })
//     }
// }
