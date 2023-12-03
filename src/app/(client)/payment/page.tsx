import ResultMessage from './components/resultMessage'

export const metadata = {
   title: 'اپوینت منت | نتیجه پرداخت ',
   description: 'صفحه نتیجه پرداخت به اپوینت منت',
}

async function Payment() {
   return (
      <div>
         <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1289'
            height='703'
            viewBox='0 0 1289 703'
            fill='none'
            className='absolute right-0 -z-10'
         >
            <g filter='url(#filter0_f_140_159)'>
               <path
                  d='M1128.62 478.098C1021.45 660.69 630.453 498.721 441.121 387.598C251.789 276.475 66.4546 84.1903 173.622 -98.402C424.122 -115.902 553.29 -277.025 742.621 -165.902C931.953 -54.7788 1235.79 295.506 1128.62 478.098Z'
                  fill='url(#paint0_linear_140_159)'
               />
            </g>
            <defs>
               <filter
                  id='filter0_f_140_159'
                  x='0.104736'
                  y='-346.701'
                  width='1292.81'
                  height='1049.22'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
               >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feBlend
                     mode='normal'
                     in='SourceGraphic'
                     in2='BackgroundImageFix'
                     result='shape'
                  />
                  <feGaussianBlur stdDeviation='71' result='effect1_foregroundBlur_140_159' />
               </filter>
               <linearGradient
                  id='paint0_linear_140_159'
                  x1='861.447'
                  y1='71.1467'
                  x2='573.622'
                  y2='432.035'
                  gradientUnits='userSpaceOnUse'
               >
                  <stop stopColor='#9edbffdb' />
                  <stop offset='1' stopColor='#9edbff' />
               </linearGradient>
            </defs>
         </svg>
         <ResultMessage />
      </div>
   )
}

export default Payment
