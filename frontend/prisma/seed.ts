const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

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
  const hashedPassword = await hash('demo123', 10)
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      password: hashedPassword,
      businessName: 'Demo Business',
      name: 'John Doe',
      profile: {
        create: {
          businessAge: 5,
          industrySector: 'Technology',
          businessSize: 'SMALL',
          gstin: 'GSTIN123456789',
          pan: 'ABCDE1234F',
          employeeCount: 10,
          annualRevenue: 1000000,
          businessAddress: '123 Business Street, Tech City',
          phoneNumber: '+91-9876543210',
        },
      },
      subscription: {
        create: {
          plan: 'PRO',
          status: 'ACTIVE',
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      },
    },
  })

  // Create demo customers
  const customer1 = await prisma.customer.create({
    data: {
      userId: demoUser.id,
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+91-1234567890',
      address: '456 Customer Ave, Business District',
      gstin: 'GSTIN987654321',
    },
  })

  // Create demo transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: demoUser.id,
        amount: 50000,
        type: 'CREDIT',
        category: 'SALES',
        description: 'Payment from Acme Corp',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        userId: demoUser.id,
        amount: 25000,
        type: 'DEBIT',
        category: 'EXPENSES',
        description: 'Office Rent',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
    ],
  })

  // Create demo invoice
  const invoice = await prisma.invoice.create({
    data: {
      userId: demoUser.id,
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