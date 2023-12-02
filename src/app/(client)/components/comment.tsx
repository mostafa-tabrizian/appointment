import { ICourse } from '@/models/workingDays'
import Rating from '@mui/material/Rating'
// import Avatar from '@mui/material/Avatar'
import SuggestionStatus from '../course/[slug]/components/comment/suggestionStatus'
import DateFormat from './dateFormat'

const Comment = ({ comment }: { comment: ICourse['comments'][0] }) => {
   const rateOptions = {
      0: 1,
      25: 2,
      50: 3,
      75: 4,
      100: 5,
   }

   return (
      <>
         <div className='bg-white border shadow-xl md:shadow-lg p-4 rounded-2xl'>
            <SuggestionStatus suggestion={comment.suggestion} />

            <div className='text-sm lg:text-base text-gray-700 font-bold mb-2'>
               <span>{comment.title}</span>
            </div>
            <div className='h-44 overflow-y-auto pl-1 mb-2'>
               <div className='my-4 space-y-4 ml-2'></div>
               <p className='text-sm leading-7 text-slate-800 lg:leading-7 mb-4'>{comment.body}</p>
               <div className='mb-3 space-y-0.5'>
                  {comment.positivePoints?.map((point) => {
                     return (
                        <div
                           key={point}
                           className='flex items-center gap-x-1 text-sm text-slate-600'
                        >
                           <svg
                              stroke='currentColor'
                              fill='currentColor'
                              strokeWidth='0'
                              viewBox='0 0 20 20'
                              className='text-green-500'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 fillRule='evenodd'
                                 d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                                 clipRule='evenodd'
                              ></path>
                           </svg>
                           <span>{point}</span>
                        </div>
                     )
                  })}
               </div>
               <div className='mb-3 space-y-0.5'>
                  {comment.negativePoints?.map((point) => {
                     return (
                        <div
                           key={point}
                           className='flex items-center gap-x-1 text-sm text-slate-600'
                        >
                           <svg
                              className='h-4 w-3 text-red-600'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              strokeWidth='2'
                              stroke='currentColor'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           >
                              {' '}
                              <path stroke='none' d='M0 0h24v24H0z' />{' '}
                              <line x1='5' y1='12' x2='19' y2='12' />
                           </svg>
                           <span>{point}</span>
                        </div>
                     )
                  })}
               </div>
            </div>
            <hr />
            <div className='flex justify-between items-center mb-4'>
               <div className='flex items-center gap-x-3 flex-1'>
                  {/* <Avatar
                     sx={{
                        width: 42,
                        height: 42,
                        border: '2px solid white',
                        boxShadow: '0 0 10px #8080805c',
                     }}
                     alt={comment.user.name}
                     src={'/avatar/' + comment.user.avatar}
                  /> */}
                  <div className='flex flex-col justify-evenly text-slate-900'>
                     <div className='flex items-center font-extrabold md:mb-0.5 md:text-sm'>
                        <span>{comment.user.name}</span>
                        <span className='mr-1 font-normal text-[10px] lg:text-xs text-slate-400'>
                           ({DateFormat(comment.createdAt)})
                        </span>
                     </div>
                  </div>
               </div>

               <Rating
                  // @ts-ignore
                  value={rateOptions[comment.rate]}
                  readOnly
                  sx={{ direction: 'ltr' }}
                  icon={
                     <span>
                        <svg
                           className='h-3 w-3 text-[#faaf00]'
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                           fill='currentColor'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           <path d='M9.654 4.586c.878-2.115 3.814-2.115 4.692 0l.612 1.474a2.555 2.555 0 0 0 2.065 1.57l1.707.194c2.155.244 3.046 2.951 1.471 4.475L18.752 13.7a2.636 2.636 0 0 0-.745 2.404l.35 1.77c.443 2.243-1.96 3.936-3.855 2.718l-1.145-.736a2.503 2.503 0 0 0-2.714 0l-1.145.736c-1.896 1.218-4.298-.475-3.855-2.717l.35-1.771a2.637 2.637 0 0 0-.745-2.404l-1.45-1.4c-1.574-1.524-.683-4.23 1.472-4.475l1.707-.194a2.555 2.555 0 0 0 2.065-1.57l.612-1.474Z'></path>
                        </svg>
                     </span>
                  }
                  emptyIcon={
                     <span>
                        <svg
                           className='h-3 w-3 text-slate-800'
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           stroke='currentColor'
                           fill='none'
                           strokeLinecap='round'
                           strokeLinejoin='round'
                        >
                           <path d='M9.654 4.586c.878-2.115 3.814-2.115 4.692 0l.612 1.474a2.555 2.555 0 0 0 2.065 1.57l1.707.194c2.155.244 3.046 2.951 1.471 4.475L18.752 13.7a2.636 2.636 0 0 0-.745 2.404l.35 1.77c.443 2.243-1.96 3.936-3.855 2.718l-1.145-.736a2.503 2.503 0 0 0-2.714 0l-1.145.736c-1.896 1.218-4.298-.475-3.855-2.717l.35-1.771a2.637 2.637 0 0 0-.745-2.404l-1.45-1.4c-1.574-1.524-.683-4.23 1.472-4.475l1.707-.194a2.555 2.555 0 0 0 2.065-1.57l.612-1.474Z'></path>
                        </svg>
                     </span>
                  }
               />
            </div>
         </div>
      </>
   )
}

export default Comment
