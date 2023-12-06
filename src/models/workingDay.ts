import mongoose from 'mongoose'

export interface IWorkingDay {
   _id: string
   dayIndex: number
   dayName: string
   dayNameFarsi: string
   openTime: number
   closeTime: number
   closed: boolean
}

const WorkingDaySchema = new mongoose.Schema({
   dayIndex: Number,
   dayName: String,
   dayNameFarsi: String,
   openTime: Number,
   closeTime: Number,
   closed: Boolean
})

export default mongoose.models.WorkingDay || mongoose.model('WorkingDay', WorkingDaySchema)
