"use client"

import { useAuth } from "@/lib/auth-context"
import { LoadingScreen } from "@/components/ui/loading-screen"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? <LoadingScreen /> : children}
    </div>
  )
} 