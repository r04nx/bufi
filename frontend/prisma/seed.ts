import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.invoiceItem.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.subscription.deleteMany()
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

  // Create demo customers
  const customer1 = await prisma.customer.create({
    data: {
      userId: user.id,
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+91-1234567890',
      address: '456 Customer Ave, Business District',
      gstin: 'GSTIN987654321',
    },
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
      // Add more sample data...
    ]
  })

  // Create demo invoice
  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      customerId: customer1.id,
      amount: 50000,
      status: 'PAID',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      items: {
        create: [
          {
            description: 'Consulting Services',
            quantity: 1,
            unitPrice: 50000,
            amount: 50000,
          },
        ],
      },
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