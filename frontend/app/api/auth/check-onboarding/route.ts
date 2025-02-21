import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AuthService } from '@/lib/services/auth-service'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json({ hasCompletedOnboarding: false })
    }

    const decoded = AuthService.verifyToken(token.value)
    if (!decoded) {
      return NextResponse.json({ hasCompletedOnboarding: false })
    }

    // Check if user has a profile with required fields
    const profile = await prisma.profile.findUnique({
      where: { userId: decoded.userId },
    })

    const hasCompletedOnboarding = !!(
      profile?.businessAge &&
      profile?.industrySector &&
      profile?.employeeCount &&
      profile?.annualRevenue &&
      profile?.businessType
    )

    return NextResponse.json({ hasCompletedOnboarding })
  } catch (error) {
    console.error('Check onboarding error:', error)
    return NextResponse.json({ hasCompletedOnboarding: false })
  }
} 