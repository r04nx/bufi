const { PrismaClient } = require('@prisma/client')
const { execSync } = require('child_process')

const prisma = new PrismaClient()

async function main() {
  try {
    // Push the schema to the database
    console.log('Pushing schema to database...')
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' })

    // Run the seed script
    console.log('Seeding database...')
    execSync('npx prisma db seed', { stdio: 'inherit' })

    console.log('Database initialization completed successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 