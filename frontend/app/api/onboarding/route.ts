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

    // Clean and validate the data
    const data = {
      userId: decoded.userId,
      businessAge: body.businessAge ? Number(body.businessAge) : null,
      industrySector: body.industrySector || null,
      businessSize: body.businessSize || null,
      gstin: body.gstin || null,
      pan: body.pan || null,
      employeeCount: body.employeeCount ? Number(body.employeeCount) : null,
      annualRevenue: body.annualRevenue ? Number(body.annualRevenue) : null,
      businessAddress: body.businessAddress || null,
      phoneNumber: body.phoneNumber || null,
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
      // Check if PAN already exists (if provided)
      if (data.pan) {
        const existingPAN = await prisma.profile.findFirst({
          where: { pan: data.pan },
        })
        if (existingPAN) {
          return NextResponse.json(
            { error: 'PAN number already registered' },
            { status: 400 }
          )
        }
      }

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