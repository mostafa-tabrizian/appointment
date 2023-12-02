/* eslint-disable camelcase */

import mongoose from 'mongoose'

export interface IVerification {
   mobileNumber: string,
   code: string
}

const VerificationSchema = new mongoose.Schema<IVerification>({
   mobileNumber: String,
   code: String
})

VerificationSchema.set('timestamps', true)

export default mongoose.models.Verification || mongoose.model('Verification', VerificationSchema)
