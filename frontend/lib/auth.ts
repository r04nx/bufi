import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { prisma } from './db'

export const auth = {
  async createUser(data: {
    email: string
    password: string
    businessName: string
  }) {
    const hashedPassword = await hash(data.password, 10)
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        businessName: data.businessName,
      },
    })

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    return {
      token,
      token_type: 'Bearer',
    }
  },

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      return null
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    return {
      token,
      token_type: 'Bearer',
    }
  },

  async getUserProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    })
  },
} 