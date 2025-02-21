"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { AuthUser } from "@/lib/services/auth-service"
import { LoadingSpinner, FullPageLoader } from "@/components/ui/loading-spinner"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  hasCompletedOnboarding: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, businessName: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  hasCompletedOnboarding: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const router = useRouter()

  const checkOnboarding = async () => {
    try {
      const response = await fetch('/api/auth/check-onboarding')
      const data = await response.json()
      setHasCompletedOnboarding(data.hasCompletedOnboarding)
      
      // Redirect to onboarding if not completed
      if (user && !data.hasCompletedOnboarding && window.location.pathname !== '/onboarding') {
        router.push('/onboarding')
      }
    } catch (error) {
      console.error('Failed to check onboarding status:', error)
    }
  }

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      checkOnboarding()
    }
  }, [user])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setIsNavigating(true)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      const data = await response.json()
      setUser(data.user)
      
      // Check onboarding status after successful login
      const onboardingResponse = await fetch('/api/auth/check-onboarding')
      const { hasCompletedOnboarding } = await onboardingResponse.json()
      
      // Redirect based on onboarding status
      router.push(hasCompletedOnboarding ? '/dashboard' : '/onboarding')
    } catch (error) {
      setIsNavigating(false)
      throw error
    }
  }

  const signUp = async (email: string, password: string, businessName: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, businessName }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }

    const data = await response.json()
    setUser(data.user)
    router.push('/onboarding')
  }

  const signOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' })
    setUser(null)
    router.push('/sign-in')
  }

  // Prevent hydration errors by not rendering until mounted
  if (!mounted || loading) {
    return <FullPageLoader />
  }

  return (
    <>
      <AuthContext.Provider value={{ user, loading, hasCompletedOnboarding, signIn, signUp, signOut }}>
        {children}
      </AuthContext.Provider>
      {isNavigating && <FullPageLoader />}
    </>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

