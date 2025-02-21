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
    
    const investor = await prisma.investor.create({
      data: {
        ...body,
        userId: decoded.userId,
      },
    })

    return NextResponse.json(investor)
  } catch (error: any) {
    console.error('Create investor error:', error)
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

    const investors = await prisma.investor.findMany({
      where: { userId: decoded.userId },
      include: {
        investments: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(investors)
  } catch (error: any) {
    console.error('Get investors error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST_ACTIVITY(req: Request) {
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
    
    const activity = await prisma.investorActivity.create({
      data: {
        ...body,
        participants: body.participants ? JSON.stringify(body.participants) : null,
        documents: body.documents ? JSON.stringify(body.documents) : null,
      },
    })

    return NextResponse.json(activity)
  } catch (error: any) {
    console.error('Create investor activity error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET_ACTIVITIES() {
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

    const activities = await prisma.investorActivity.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
    })

    const parsedActivities = activities.map(activity => ({
      ...activity,
      participants: activity.participants ? JSON.parse(activity.participants) : [],
      documents: activity.documents ? JSON.parse(activity.documents) : [],
    }))

    return NextResponse.json(parsedActivities)
  } catch (error: any) {
    console.error('Get investor activities error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 