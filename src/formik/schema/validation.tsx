import * as yup from 'yup'
import * as rule from './rules'

export const AppointmentValidation = yup.object().shape({
   name: yup
      .string()
      .required('لطفا نام و نام خانوادگی خود را وارد کنید')
      .min(6, 'نام و نام خانوادگی حداقل باید ۶ کارکتر باشد')
      .matches(rule.persian, 'لطفا نام و نام خانوادگی خود را به فارسی وارد کنید'),
   mobileNumber: yup
      .string()
      .matches(rule.mobileNumber, { message: 'شماره تماس نامعتبر می‌باشد' })
      .required('لطفا شماره موبایل خود را وارد کنید'),
   description: yup
      .string()
      .min(10, 'توضیحات حداقل باید ۱۰ کارکتر باشد')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),
})

export const VerificationSchemaValidation = yup.object().shape({
   code: yup
      .string()
      .min(5, '!کد شما صحیح نمی‌باشد')
      .max(5, '!کد شما صحیح نمی‌باشد')
      .required('لطفا کد تأیید خود را وارد کنید'),
})
