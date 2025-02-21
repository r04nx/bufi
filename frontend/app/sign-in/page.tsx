"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { authApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const credentials = {
        email: formData.get('email')?.toString().trim() || '',
        password: formData.get('password')?.toString() || ''
      }

      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      // For debugging
      console.log('Sending credentials:', credentials)

      const response = await authApi.login(credentials)
      
      // Store the token
      if (response && response.token) {
        localStorage.setItem('token', response.token)
        
        // Show success message
        toast({
          title: "Success",
          description: "Successfully signed in!",
          variant: "default",
        })

        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        throw new Error('Invalid response from server')
      }
      
    } catch (error: any) {
      console.error('Login error:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80"
            alt="Business Finance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-orange-600/80 to-primary/70" />
        </div>
        
        <div className="relative z-20 flex items-center text-lg font-medium">
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
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "BUFI has transformed how we manage our finances. The insights and automation have helped us make better business decisions."
            </p>
            <footer className="text-sm">Sarah Chen, CEO of TechGrowth</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={loading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password"
                disabled={loading} 
                required 
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" type="button" className="gap-2">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Google
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/reset-password" className="hover:text-brand underline underline-offset-4">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

