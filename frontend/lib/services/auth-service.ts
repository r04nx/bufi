import { prisma } from '@/lib/db'
import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export type AuthUser = {
  id: string
  email: string
  name: string | null
  businessName: string | null
  subscription?: {
    planType: string
    status: string
    aiCreditsUsed: number
  }
}

export class AuthService {
  static async signUp(data: {
    email: string
    password: string
    businessName: string
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error('Email already exists')
    }

    const hashedPassword = await hash(data.password, 10)
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        businessName: data.businessName,
      },
    })

    // Get or create free plan
    const freePlan = await prisma.subscriptionPlan.findFirst({
      where: { name: 'Free' }
    }) || await prisma.subscriptionPlan.create({
      data: {
        name: 'Free',
        description: 'Basic plan for small businesses',
        price: 0,
        features: JSON.stringify([
          'Basic financial tracking',
          'Up to 100 transactions/month',
          '5 AI queries/month'
        ]),
        limits: JSON.stringify({
          transactions: 100,
          aiCredits: 5,
          users: 1
        })
      }
    })

    // Create subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        planId: freePlan.id,
        planType: 'FREE',
        billingPeriod: 'MONTHLY',
        startDate: new Date(),
        status: 'ACTIVE'
      }
    })

    const token = this.generateToken(user.id)
    return { token, user: await this.sanitizeUser(user.id) }
  }

  static async signIn(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        subscription: true
      }
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    const token = this.generateToken(user.id)
    return { token, user: await this.sanitizeUser(user.id) }
  }

  static generateToken(userId: string) {
    return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  }

  static verifyToken(token: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!)
      return decoded as { userId: string }
    } catch {
      return null
    }
  }

  static async sanitizeUser(userId: string): Promise<AuthUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      businessName: user.businessName,
      subscription: user.subscription ? {
        planType: user.subscription.planType,
        status: user.subscription.status,
        aiCreditsUsed: user.aiCreditsUsed
      } : undefined
    }
  }
} 