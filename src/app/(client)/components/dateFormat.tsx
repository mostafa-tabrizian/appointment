import toFarsiNumber from '@/lib/toFarsiNumber'

const DateFormat = (fullDate: Date) => {
   if (!fullDate) return

   fullDate = new Date(fullDate)

   const publishUnixTime = fullDate.getTime()
   const currentUnixTime: number = new Date().getTime()

   const convertToMonth = (time: number) => time / 1000 / 60 / 60 / 24 / 30
   const convertToDay = (time: number) => time / 1000 / 60 / 60 / 24
   const convertToHour = (time: number) => time / 1000 / 60 / 60
   const convertToMinutes = (time: number) => time / 1000 / 60
   const convertToSeconds = (time: number) => time / 1000

   const monthsPast = Math.floor(convertToMonth(currentUnixTime - publishUnixTime))
   const daysPast = Math.floor(convertToDay(currentUnixTime - publishUnixTime))
   const hoursPast = Math.floor(convertToHour(currentUnixTime - publishUnixTime))
   const minutesPast = Math.floor(convertToMinutes(currentUnixTime - publishUnixTime))
   const secondsPast = Math.floor(convertToSeconds(currentUnixTime - publishUnixTime))

   let result

   if (monthsPast >= 1) {
      result = `${new Date(fullDate).toLocaleDateString('fa-IR', {
         year: 'numeric',
         month: 'short',
         day: 'numeric',
      })}`
   } else if (daysPast >= 1) {
      result = `${toFarsiNumber(daysPast)} روز پیش`
   } else if (hoursPast >= 1) {
      result = `${toFarsiNumber(hoursPast)} ساعت پیش`
   } else if (minutesPast >= 1) {
      result = `${toFarsiNumber(minutesPast)} دقیقه پیش`
   } else {
      result = `${toFarsiNumber(secondsPast)} ثانیه پیش`
   }

   return result
}

export default DateFormat
