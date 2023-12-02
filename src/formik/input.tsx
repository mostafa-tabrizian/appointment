import { useField } from 'formik'

// @ts-ignore
const FormikInput = ({ label, ...props }) => {
   // @ts-ignore
   const [field, meta] = useField(props)

   return (
      <div className='text-right'>
         <label>
            <h6>{label}</h6>
         </label>
         <input
            {...field}
            {...props}
            className={`${
               meta.error && meta.touched ? 'invalidInput' : ''
            } rounded-xl w-full rtl px-4 py-2 focus:shadow-xl focus:shadow-blue-700/20 transition-all focus:border-blue-700/20 outline-none`}
         />
         {meta.error && meta.touched ? <p className='text-sm text-red-500'>{meta.error}</p> : ''}
      </div>
   )
}

export default FormikInput
