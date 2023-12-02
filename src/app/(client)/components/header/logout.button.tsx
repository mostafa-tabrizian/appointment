'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

const LogoutButton = () => {
   const [loading, setLoading] = useState(false)

   const submitLogout = () => {
      setLoading(true)
      signOut({ callbackUrl: '/' })
   }

   return (
      <>
         {loading ? (
            <CircularProgress className='text-rose-600' color='inherit' size={24} />
         ) : (
            <button disabled={loading} onClick={() => submitLogout()}>
               <span className='font-bold text-sm'>خروج</span>
            </button>
         )}
      </>
   )
}

export default LogoutButton
