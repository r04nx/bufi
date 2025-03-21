const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.subscription.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()

  // Create demo user
  const user = await prisma.user.create({
    data: {
      email: 'demo@bufi.com',
      name: 'Demo User',
      password: await hash('demo123', 12),
      businessName: 'BuFi Demo Business',
      profile: {
        create: {
          businessAge: 5,
          industrySector: 'Technology',
          employeeCount: 25,
          annualRevenue: 1200000,
        }
      }
    }
  })

  // Create subscription plan
  const freePlan = await prisma.subscriptionPlan.create({
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

  // Assign free plan to user
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

  // Add sample transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        date: new Date(),
        amount: 5000,
        type: 'CREDIT',
        category: 'Sales',
        description: 'Product Sale',
        status: 'COMPLETED'
      },
      {
        userId: user.id,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        amount: 2000,
        type: 'DEBIT',
        category: 'Expenses',
        description: 'Office Supplies',
        status: 'COMPLETED'
      }
    ]
  })

  // Create demo invoice
  await prisma.invoice.create({
    data: {
      userId: user.id,
      amount: 50000,
      status: 'PAID',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      clientName: 'Acme Corp',
      description: 'Consulting Services'
    },
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 