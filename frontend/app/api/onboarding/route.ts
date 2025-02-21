import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AuthService } from '@/lib/services/auth-service'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = AuthService.verifyToken(token.value)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const body = await req.json()

    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: decoded.userId },
    })

    const profileData = {
      userId: decoded.userId,
      businessAge: body.businessAge,
      industrySector: body.industrySector,
      businessType: body.businessType,
      employeeCount: body.employeeCount,
      annualRevenue: body.annualRevenue,
      taxIdentifier: body.gstin || body.pan || null,
      address: body.businessAddress || null,
      phone: body.phoneNumber || null,
    }

    if (existingProfile) {
      // Update existing profile
      const profile = await prisma.profile.update({
        where: { userId: decoded.userId },
        data: profileData,
      })
      return NextResponse.json(profile)
    } else {
      // Create new profile
      const profile = await prisma.profile.create({
        data: profileData,
      })
      return NextResponse.json(profile)
    }
  } catch (error: any) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 