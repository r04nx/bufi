import { prisma } from '@/lib/db'
import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export type AuthUser = {
  id: string
  email: string
  name: string | null
  businessName: string | null
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

    const token = this.generateToken(user.id)
    return { token, user: this.sanitizeUser(user) }
  }

  static async signIn(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    const token = this.generateToken(user.id)
    return { token, user: this.sanitizeUser(user) }
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

  static sanitizeUser(user: any): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      businessName: user.businessName,
    }
  }
} 