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
    
    const report = await prisma.report.create({
      data: {
        ...body,
        dateRange: JSON.stringify(body.dateRange),
        userId: decoded.userId,
      },
    })

    return NextResponse.json(report)
  } catch (error: any) {
    console.error('Create report error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
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

    const reports = await prisma.report.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
    })

    const parsedReports = reports.map(report => ({
      ...report,
      dateRange: JSON.parse(report.dateRange),
    }))

    return NextResponse.json(parsedReports)
  } catch (error: any) {
    console.error('Get reports error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 