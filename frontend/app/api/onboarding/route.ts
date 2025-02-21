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

    // Ensure all numeric fields are properly typed
    const data = {
      userId: decoded.userId,
      businessAge: Number(body.businessAge),
      industrySector: body.industrySector,
      businessSize: body.businessSize,
      gstin: body.gstin,
      pan: body.pan,
      employeeCount: Number(body.employeeCount),
      annualRevenue: Number(body.annualRevenue),
      businessAddress: body.businessAddress,
      phoneNumber: body.phoneNumber,
    }

    // Check if profile already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: decoded.userId },
    })

    let profile
    if (existingProfile) {
      profile = await prisma.profile.update({
        where: { userId: decoded.userId },
        data,
      })
    } else {
      profile = await prisma.profile.create({
        data,
      })
    }

    return NextResponse.json({ profile })
  } catch (error: any) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 