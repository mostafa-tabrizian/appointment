'use client'

import '@/app/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
// import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en' className='rtl'>
         <body>
            {/* <GoogleReCaptchaProvider
               reCaptchaKey='6LdpgP4nAAAAAJS3rvxwPtNmzv3lLtyidMYNLRoP'
               scriptProps={{
                  async: false,
                  defer: false,
                  appendTo: 'head',
                  nonce: undefined,
               }}
            > */}
            {/* <GoogleOAuthProvider clientId='6091770677-feues293oaipt9nqh2k78g3t312v0vev.apps.googleusercontent.com'> */}
            <SessionProvider>
               <ToastContainer
                  position='top-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='light'
               />

               <main className='mx-auto overflow-x-hidden'>{children}</main>
            </SessionProvider>
            {/* </GoogleOAuthProvider> */}
            {/* </GoogleReCaptchaProvider> */}
         </body>
      </html>
   )
}
