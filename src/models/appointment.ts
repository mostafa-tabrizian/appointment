import mongoose from 'mongoose'

export interface IAppointment {
   _id: string
   name: string
   mobileNumber: string
   description: string
   paid: boolean
   active: boolean
   reservedAt: Date
   createdAt: Date
   updatedAt: Date
}

const AppointmentSchema = new mongoose.Schema({
   name: String,
   mobileNumber: String,
   description: String,
   paid: Boolean,
   active: {
      type: Boolean,
      default: true,
   },
   reservedAt: Date
})

AppointmentSchema.set('timestamps', true)

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema)
