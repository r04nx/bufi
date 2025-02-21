"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        business_name: formData.get('business-name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }

      const response = await authApi.register(data)
      localStorage.setItem('token', response.token)
      router.push('/onboarding')
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-[400px] space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">Enter your information to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" name="business-name" placeholder="Acme Inc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" required type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" name="confirm-password" required type="password" />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link className="underline" href="/sign-in">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

