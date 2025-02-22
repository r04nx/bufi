import type React from "react"
import { Inter } from "next/font/google"
import { ClientProviders } from "@/providers/client-providers"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BUFI - Smart Business Finance",
  description: "AI-powered financial management for growing businesses",
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/logo-black-bg.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <ClientProviders>
            <div className="min-h-screen bg-background">{children}</div>
          </ClientProviders>
          <Toaster />
          <SonnerToaster />
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'