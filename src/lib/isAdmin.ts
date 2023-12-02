import { getServerSession } from 'next-auth'

import authOptions from '@/lib/auth'
import User from '@/models/user'
import dbConnect from './dbConnect'

const isAdmin = async () => {
   const session: { _doc: { mobileNumber: string } } | null = await getServerSession(authOptions)
   if (!session) return null

   await dbConnect()
   const user = await User.findOne({
      mobileNumber: session._doc.mobileNumber
   }, 'role').exec()

   return user.role === 'ادمین' ? true : false
}

export default isAdmin
