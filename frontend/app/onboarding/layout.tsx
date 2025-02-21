import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Onboarding - BUFI",
  description: "Complete your business profile to get started",
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block bg-primary">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/50" />
        <div className="relative h-full p-8 flex flex-col justify-between text-white">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo-white-bg.svg"
              alt="BUFI Logo"
              width={40}
              height={40}
              className="invert"
            />
            <span className="text-2xl font-bold">BUFI</span>
          </Link>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to BUFI</h2>
            <p className="text-primary-foreground/80">
              Let's get your business set up with smart financial management. This will only take a few minutes.
            </p>
          </div>
        </div>
      </div>
      <main className="flex flex-col min-h-screen">{children}</main>
    </div>
  )
}

