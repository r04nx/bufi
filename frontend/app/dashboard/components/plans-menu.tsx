"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Zap, Star, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function PlansMenu() {
  const router = useRouter()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Example usage data - replace with actual data from your backend
  const usage = {
    transactions: {
      used: 75,
      total: 100,
      label: "Transactions"
    },
    aiCredits: {
      used: 3,
      total: 5,
      label: "AI Credits"
    },
    storage: {
      used: 250,
      total: 500,
      label: "Storage (MB)"
    }
  }

  const currentPlan = {
    name: "Pro",
    price: "₹1,999",
    cycle: "monthly",
    features: [
      "Unlimited Transactions",
      "Advanced Analytics",
      "Custom Reports",
      "Priority Support",
      "Team Collaboration",
    ]
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full justify-start px-3 py-2 rounded-lg transition-colors hover:bg-muted"
        >
          <Crown className="h-4 w-4 mr-3" />
          Plans & Usage
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Your Plan & Usage</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Current Plan */}
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{currentPlan.name} Plan</h3>
                <p className="text-sm text-muted-foreground">Current plan</p>
              </div>
              <Badge variant="secondary">{currentPlan.name}</Badge>
            </div>
            <Button 
              className="mt-4 w-full"
              onClick={() => {
                setIsOpen(false)
                router.push('/pricing')
              }}
            >
              Upgrade Plan
            </Button>
          </Card>

          {/* Usage Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold">Usage This Month</h3>
            {Object.entries(usage).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{data.label}</span>
                  <span>
                    {data.used} / {data.total}
                  </span>
                </div>
                <Progress 
                  value={(data.used / data.total) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Available Features</h3>
            <div className="space-y-2">
              {currentPlan.features.map((feature) => (
                <div className="flex items-center text-sm">
                  <Zap className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade CTA */}
          <Card className="p-4 bg-orange-50 dark:bg-orange-950">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-600 dark:text-orange-400">
                  Upgrade to Pro
                </h3>
                <p className="text-sm text-orange-600/80 dark:text-orange-400/80">
                  Get unlimited access to all features
                </p>
              </div>
              <Button 
                variant="outline"
                className="text-orange-600 border-orange-600"
                onClick={() => {
                  setIsOpen(false)
                  router.push('/pricing')
                }}
              >
                Upgrade
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
} 