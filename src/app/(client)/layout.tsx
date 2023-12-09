import '@/app/styles/globals.scss'
// import Footer from './components/footer'
// import Header from './components/header/header'
// import User from '@/lib/user'
// import { IUser } from '@/models/user'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   // const user: IUser = await User()

   return (
      <>
         {/* <Header user={user} /> */}

         <main>
            {children}
         </main>

         {/* <Footer /> */}
      </>
   )
}
