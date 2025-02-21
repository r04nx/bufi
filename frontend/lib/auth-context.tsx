"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate checking auth status
    const user = localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const signOut = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/sign-in")
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

