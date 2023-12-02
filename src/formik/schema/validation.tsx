import * as yup from 'yup'
import * as rule from './rules'

export const RegisterSchemaValidation = yup.object().shape({
   mobileNumber: yup
      .string()
      .matches(rule.mobileNumber, { message: 'شماره تماس نامعتبر می‌باشد' })
      .required('لطفا شماره موبایل خود را وارد کنید'),
   password: yup
      .string()
      .min(5, 'رمز شما می‌بایست حداقل ۵ کاراکتر باشد')
      .matches(rule.password, {
         message: 'رمز شما می‌بایست حداقل یک عدد و یک حرف کوچک یا بزرگ داشته باشد',
      })
      .required('لطفا یک رمز وارد کنید'),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'رمز عبور شما یکسان نمی‌باشد')
      .required('لطفا رمز عبور خود را تایید کنید'),
})

export const VerificationSchemaValidation = yup.object().shape({
   code: yup
      .string()
      .min(5, '!کد شما صحیح نمی‌باشد')
      .max(5, '!کد شما صحیح نمی‌باشد')
      .required('لطفا کد تأیید خود را وارد کنید'),
})

export const LoginSchemaValidation = yup.object().shape({
   mobileNumber: yup
      .string()
      .matches(rule.mobileNumber, { message: 'شماره تماس نامعتبر می‌باشد' })
      .required('لطفا شماره موبایل خود را وارد کنید'),
   password: yup.string().required('لطفا رمز خود را وارد کنید'),
})

export const PasswordSchemaValidation = yup.object().shape({
   oldPass: yup.string().required('لطفا رمز خود را وارد کنید'),
   newPass: yup
      .string()
      .min(5, 'رمز شما می‌بایست حداقل ۵ کاراکتر باشد')
      .matches(rule.password, {
         message: 'رمز شما می‌بایست حداقل یک عدد و یک حرف کوچک یا بزرگ داشته باشد',
      })
      .required('لطفا یک رمز وارد کنید')
      .notOneOf([yup.ref('oldPass')], 'رمز عبور فعلی و جدید نباید یکی باشد'),
   confirmNewPass: yup
      .string()
      .oneOf([yup.ref('newPass')], 'رمز عبور شما یکسان نمی‌باشد')
      .required('لطفا رمز عبور خود را تایید کنید'),
})

export const ForgotPasswordSchemaValidation = yup.object().shape({
   mobileNumber: yup
      .string()
      .matches(rule.mobileNumber, { message: 'شماره تماس نامعتبر می‌باشد' })
      .required('لطفا شماره موبایل خود را وارد کنید'),
})

export const ProfileSchemaValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .matches(rule.persian, 'لطفا نام و نام خانوادگی خود را به فارسی وارد کنید'),
})

export const CourseSchemaValidation = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('توضیحات محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),

   brand: yup.string().required('برند محصول را وارد کنید'),
})

export const CommentSchemaValidation = yup.object().shape({
   title: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان دیدگاه خود را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('توضیحات خود را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),
})

export const QuestionSchemaValidation = yup.object().shape({
   body: yup
      .string()
      .min(10, 'پرسش حداقل باید ۱۰ کارکتر باشد')
      .required('پرسش خود را وارد کنید')
      .matches(rule.persian, { message: 'لطفا پرسش را به فارسی وارد کنید' }),
})

export const NameAndDescriptionSchemaValidation = yup.object().shape({
   name: yup
      .string()
      .min(3, 'عنوان حداقل باید ۳ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا عنوان را به فارسی وارد کنید' }),

   description: yup
      .string()
      .min(30, 'توضیحات حداقل باید ۳۰ کارکتر باشد')
      .required('عنوان محصول را وارد کنید')
      .matches(rule.persian, { message: 'لطفا توضیحات را به فارسی وارد کنید' }),
})

// export const LocationSchemaValidation = yup.object().shape({
//    price: yup.number().min(1000, 'حداقل قیمت ۱۰۰۰ تومان است').required('قیمت چهره را وارد کنید'),

//    discount: yup
//       .number()
//       .lessThan(100, 'تخفیف باید کمتر از ۱۰۰ باشد')
//       .moreThan(-1, 'تخفیف می‌بایست مساوی یا بیشتر از ۰ باشد')
//       .required('(در صورت نداشت عدد ۰ را وارد کنید) تخفیف چهره را وارد کنید'),

//    size: yup
//       .number()
//       .max(50, 'حداکثر سایز ۵۰ است')
//       .min(30, 'حداقل سایز ۳۰ است')
//       .required('سایز چهره را وارد کنید'),

//    quantity: yup
//       .number()
//       .moreThan(-1, 'سایز می‌بایست مساوی یا بیشتر از ۰ باشد')
//       .required('تعداد موجودی چهره را وارد کنید'),

//    color: yup
//       .string()
//       .required('رنگ چهره را وارد کنید')
//       .oneOf(
//          [
//             'WHITE',
//             'BLACK',
//             'YELLOW',
//             'ORANGE',
//             'RED',
//             'BROWN',
//             'PURPLE',
//             'DARKBLUE',
//             'BLUE',
//             'LIGHTBLUE',
//             'GREEN',
//             'YELLOWGREEN',
//          ],
//          {
//             message: 'رنگ وارد شده معتبر نمی‌باشد',
//          },
//       ),
// })
