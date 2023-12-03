import mongoose from 'mongoose'

export interface IPayment {
    _id: string
    clientName: string
    clientMobileNumber: string
    amount: number
    cardNumber: string
    refId: string
    createdAt: Date
    updatedAt: Date
}

const PaymentSchema = new mongoose.Schema({
    clientName: String,
    clientMobileNumber: String,
    amount: Number,
    cardNumber: {
        type: String,
        default: ''
    },
    refId: {
        type: String,
        default: ''
    }
})

PaymentSchema.set('timestamps', true)

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)
