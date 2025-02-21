import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthService } from './lib/services/auth-service'

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = ['/sign-in', '/sign-up', '/reset-password']
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Get token from cookies
  const token = request.cookies.get('token')?.value

  if (!token && !isPublicPath) {
    const searchParams = new URLSearchParams([
      ['next', request.nextUrl.pathname],
    ])
    return NextResponse.redirect(new URL(`/sign-in?${searchParams}`, request.url))
  }

  if (token) {
    // Check if user has completed onboarding
    const response = await fetch(`${request.nextUrl.origin}/api/auth/check-onboarding`, {
      headers: {
        Cookie: `token=${token}`,
      },
    })
    
    const { hasCompletedOnboarding } = await response.json()

    // If onboarding is not completed and user is not on onboarding page
    if (!hasCompletedOnboarding && !request.nextUrl.pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    // If onboarding is completed and user tries to access onboarding page
    if (hasCompletedOnboarding && request.nextUrl.pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/onboarding/:path*',
    '/sign-in',
    '/sign-up',
  ],
} 