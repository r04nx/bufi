import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-[400px] space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Reset password</h1>
          <p className="text-muted-foreground">Enter your email address and we will send you a verification code</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>
          <Button className="w-full" type="submit">
            Send Reset Link
          </Button>
        </div>
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link className="underline" href="/sign-in">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

