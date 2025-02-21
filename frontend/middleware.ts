import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in') || 
                     request.nextUrl.pathname.startsWith('/sign-up')
  
  if (!token && !isAuthPage && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/onboarding/:path*'],
} 