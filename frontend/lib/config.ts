export const config = {
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development'
  },
  api: {
    baseUrl: process.env.BACKEND_URL || 'http://localhost:5000',
  },
  auth: {
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    nextAuthSecret: process.env.NEXTAUTH_SECRET || 'your-super-secret-key-here'
  }
} 