import dbConnect from '@/lib/dbConnect'
import Course, { ICourse } from '@/models/workingDays'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function GET() {
   await dbConnect()
   const courses = await Course.find()

   return NextResponse.json(courses)
}

// export async function POST(request: Request) {
//    const { publicState, courseId, color, size, quantity, price, discount } = await request.json()

//    const colorData = await prisma.color
//       .create({
//          data: {
//             color: color,
//          },
//       })
//       .then((res) => res)

//    const sizeData = await prisma.size
//       .create({
//          data: {
//             size: parseInt(size),
//          },
//       })
//       .then((res) => res)

//    const locationData = await prisma.courseLocation.create({
//       data: {
//          public: publicState,
//          courseId: courseId,
//          colorId: colorData.id,
//          sizeId: sizeData.id,
//          quantity: parseInt(quantity),
//          price: parseInt(price),
//          discount: parseInt(discount),
//       },
//    })

//    return NextResponse.json(locationData)
// }

// export async function PATCH(request: Request) {
//    const { _id, publicStatus, name, description, price, discount }: {
//       _id: string,
//       publicStatus: boolean,
//       name: string,
//       description: string,
//       price: string,
//       discount: string
//    } = await request.json()

//    const submitData: ICourse | object = {}

//    if (typeof(publicStatus) == 'boolean') submitData['public'] = publicStatus
//    if (name) submitData['name'] = name
//    if (description) submitData['description'] = description
//    if (price?.length) submitData['price'] = price
//    if (discount?.length) submitData['discount'] = discount

//    await dbConnect()
//    const course = await Course.findOneAndUpdate({
//       _id: _id,
//    }, {
//       ...submitData
//    })
   
//    course.save()

//    return NextResponse.json(course)
// }

