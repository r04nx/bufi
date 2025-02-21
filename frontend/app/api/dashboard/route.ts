import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AuthService } from '@/lib/services/auth-service'
import { prisma } from '@/lib/db'

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

    // Fetch user data with profile
    const userData = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: true,
        transactions: {
          take: 5,
          orderBy: { date: 'desc' }
        },
        invoices: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate some basic metrics
    const metrics = {
      totalRevenue: userData.transactions
        .filter(t => t.type === 'CREDIT')
        .reduce((sum, t) => sum + t.amount, 0),
      totalExpenses: userData.transactions
        .filter(t => t.type === 'DEBIT')
        .reduce((sum, t) => sum + t.amount, 0),
      pendingInvoices: userData.invoices
        .filter(i => i.status === 'PENDING')
        .length,
      businessAge: userData.profile?.businessAge || 0
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        businessName: userData.businessName
      },
      profile: userData.profile,
      metrics,
      recentTransactions: userData.transactions,
      recentInvoices: userData.invoices
    })
  } catch (error: any) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 