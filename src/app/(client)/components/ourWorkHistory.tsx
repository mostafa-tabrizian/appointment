const Container = ({ children }: { children: React.ReactNode }) => {
   return (
      <div
         className='rounded-xl p-3 w-full bg-white shadow-lg shadow-gray-300/30 md:w-[31%] text-skin-icon-secondary-dk hover:text-skin-icon-primary hover:shadow-primary-300/50 transition-all duration-300 ease-in-out'
         aria-label='ارائه تجربه 7 سال کار تخصصی'
      >
         <div className='flex flex-row sm:flex-col items-center gap-x-3'>{children}</div>
      </div>
   )
}

const OurWorkHistory = () => {
   return (
      <div className='flex flex-col gap-y-8 md:flex-row md:justify-between md:items-center md:gap-x-5'>
         <div className='lg:w-1/3 px-4 md:px-0 order-1'>
            <div>
               <div className='flex justify-end items-center gap-x-3 mb-4'>
                  <h2 className='yekanBlack text-slate-900 text-xl md:text-right md:text-4xl'>
                     سابقه اپوینت منت
                  </h2>
                  <div className='p-3 relative from-blue-300 to-blue-500 bg-gradient-to-r flex items-center rounded-3xl justify-center drop-shadow'>
                     <svg
                        viewBox='0 0 74 74'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-full h-full top-0 left-0 absolute'
                     >
                        <path
                           d='M73.302 36.65c0 24.435-12.217 36.652-36.651 36.652C12.217 73.302 0 61.085 0 36.65 0 12.217 12.217 0 36.65 0c24.435 0 36.652 12.217 36.652 36.65Z'
                           fill='url(#warranty-holder_svg__a)'
                        ></path>
                     </svg>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        className='w-7 h-7 lg:w-11 lg:h-11 text-white z-10'
                     >
                        <path
                           stroke='currentColor'
                           strokeLinecap='round'
                           strokeWidth='1.5'
                           d='M8.88 15.12v-4.16m6.24 4.16V12M12 14.08v-5.2m-8.647 6.17a13.354 13.354 0 0 1 0-6.1A7.511 7.511 0 0 1 8.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 0 1 5.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 0 1-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 0 1-5.597-5.597Z'
                        ></path>
                     </svg>
                  </div>
               </div>
               <p className='text-xs text-center opacity-80 lg:text-base leading-6 lg:leading-8'>
                  .آمار ها باعث افتخار ما هستند
               </p>
            </div>
         </div>
         <div className='flex-1 md:max-w-2xl flex flex-col md:flex-row md:items-stretch gap-y-7 md:gap-y-0 md:justify-between md:gap-x-4'>
            <Container>
               <p className='text-sm text-right text-opacity-75 font-bold sm:mt-2 flex-1'>
                  سال سابقه فعالیت حرفه ای
               </p>
               <h3 className='yekanBlack text-lg sm:text-2xl flex items-center gap-x-1'>
                  + ۲
                  <svg
                     stroke='currentColor'
                     fill='none'
                     strokeWidth='0'
                     viewBox='0 0 24 24'
                     className='w-5 h-5'
                     height='1em'
                     width='1em'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                     ></path>
                  </svg>
               </h3>
            </Container>

            <Container>
               <p className='text-sm text-right text-opacity-75 font-bold sm:mt-2 flex-1'>
                  دانشجو خصوصی و آنلاین
               </p>
               <h3 className='yekanBlack text-lg sm:text-2xl flex items-center gap-x-1'>
                  + ۷۵۰
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 24 24'
                     fill='none'
                     className='w-5 h-5'
                  >
                     <path
                        stroke='currentColor'
                        strokeWidth='1.5'
                        d='M3 18.433a4.074 4.074 0 0 1 3.432-4.023l.178-.029a15.163 15.163 0 0 1 4.78 0l.178.029A4.074 4.074 0 0 1 15 18.433c0 .865-.702 1.567-1.567 1.567H4.567A1.567 1.567 0 0 1 3 18.433ZM12.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                     ></path>
                     <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeWidth='1.5'
                        d='M15 11a3.5 3.5 0 1 0 0-7m2.39 16h2.043c.865 0 1.567-.702 1.567-1.567a4.074 4.074 0 0 0-3.432-4.023v0a2.28 2.28 0 0 0-.359-.029h-.968'
                     ></path>
                  </svg>
               </h3>
            </Container>

            <Container>
               <p className='text-sm text-right text-opacity-75 font-bold sm:mt-2 flex-1'>
                  رضایت از آموزش
               </p>
               <h3 className='yekanBlack text-lg sm:text-2xl flex items-center gap-x-1'>
                  + % ۹۷
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     viewBox='0 0 24 24'
                     fill='none'
                     className='w-5 h-5'
                  >
                     <path
                        stroke='currentColor'
                        strokeWidth='1.5'
                        d='m15.875 19.487.18-.124c.566-.391.849-.587 1.101-.796a7.495 7.495 0 0 0 2.603-4.476c.056-.323.086-.664.144-1.346l.03-.353A17.996 17.996 0 0 0 19.906 9l-.036-.349a5.75 5.75 0 0 0-3.205-4.574 10.642 10.642 0 0 0-9.328 0A5.75 5.75 0 0 0 4.13 8.65L4.094 9a17.993 17.993 0 0 0-.029 3.391l.03.353c.06.682.089 1.023.145 1.346a7.495 7.495 0 0 0 2.603 4.476c.253.21.535.405 1.1.796l.18.124c.769.532 1.153.797 1.538.982a5.41 5.41 0 0 0 4.676 0c.385-.185.77-.45 1.537-.982Z'
                     ></path>
                     <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1.5'
                        d='m9.25 11.75 2 2 3.5-3.75'
                     ></path>
                  </svg>
               </h3>
            </Container>
         </div>
      </div>
   )
}

export default OurWorkHistory
