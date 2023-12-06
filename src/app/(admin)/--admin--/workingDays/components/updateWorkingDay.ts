'use server'

import WorkingDay from '@/models/workingDay'

const updateWorkingDay = async ({ _id, openTime, closeTime, closed }: { _id: string, openTime: number, closeTime: number, closed: boolean }) => {
    await WorkingDay.findOneAndUpdate({ _id }, { openTime, closeTime, closed })
}

export default updateWorkingDay