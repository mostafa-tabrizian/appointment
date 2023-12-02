import { getServerSession } from 'next-auth'
import User from '@/models/user'
import dbConnect from '@/lib/dbConnect'
import nowDate from '@/lib/nowDate'

import authOptions from './auth'

const UserDetail = async () => {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)

   if (!session) return null

   await dbConnect()
   const user = await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }).exec()

   user.lastVisit = nowDate()
   user.save()


   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { password: _, ...filteredUser } = user._doc
   return filteredUser
}

export default UserDetail
