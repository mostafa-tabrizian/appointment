import withAuth from 'next-auth/middleware'
import { NextRequest } from 'next/server'

export default withAuth(function middleware(request: NextRequest) {

   const { pathname } = request.nextUrl

   if (pathname == '/--admin--') {
      request.nextUrl.pathname = '/--admin--/appointments'
      return Response.redirect(request.nextUrl)
   }
}, {
   callbacks: {
      authorized: ({ req, token }) => {
         if (
            req.nextUrl.pathname.includes('--admin--') &&
            token === null
         ) {
            return false
         }
         return true
      }
   }
})

export const config = {
   matcher: ['/--admin--/:path*', '/api/--admin--/:path*'],
}