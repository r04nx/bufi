import { AuthService } from '@/lib/services/auth-service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, businessName } = body

    if (!email || !password || !businessName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { token, user } = await AuthService.signUp({
      email,
      password,
      businessName,
    })

    const response = NextResponse.json({ user })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Email already exists' ? 400 : 500 }
    )
  }
} 