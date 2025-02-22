'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Check, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PRICING_PLANS, PLAN_PERKS } from '@/lib/config/pricing'

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [planType, setPlanType] = useState<'individual' | 'business'>('individual')
  const router = useRouter()
  const { user } = useAuth()

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(annual ? price * 0.8 * 12 : price)
  }

  const handleSubscribe = async (plan: typeof PRICING_PLANS.individual[0]) => {
    if (!user) {
      router.push('/sign-in?next=/pricing')
      return
    }

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: plan.name,
          billingPeriod: annual ? 'ANNUAL' : 'MONTHLY',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create subscription')
      }

      const data = await response.json()
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error('Subscription error:', error)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose your plan</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Scale your business with our flexible pricing
        </p>
        
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant={planType === 'individual' ? 'default' : 'outline'}
              onClick={() => setPlanType('individual')}
            >
              Individual
            </Button>
            <Button
              variant={planType === 'business' ? 'default' : 'outline'}
              onClick={() => setPlanType('business')}
            >
              Business
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className={!annual ? 'font-bold' : ''}>Monthly</span>
            <Switch
              checked={annual}
              onCheckedChange={setAnnual}
            />
            <span className={annual ? 'font-bold' : ''}>
              Annual <span className="text-green-600">(Save 20%)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PRICING_PLANS[planType].map((plan) => (
          <Card key={plan.name} className="p-8 relative">
            {plan.name === 'Pro' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-muted-foreground">
                  /{annual ? 'year' : 'month'}
                </span>
              </div>
              <Button 
                className="w-full"
                variant={plan.name === 'Pro' ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Limits</h4>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span className="text-sm">Transactions</span>
                    <span className="text-sm font-medium">
                      {plan.limits.transactions === -1 ? 'Unlimited' : plan.limits.transactions}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm">AI Credits</span>
                    <span className="text-sm font-medium">
                      {plan.limits.aiCredits === -1 ? 'Unlimited' : plan.limits.aiCredits}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm">Team Members</span>
                    <span className="text-sm font-medium">
                      {plan.limits.users === -1 ? 'Unlimited' : plan.limits.users}
                    </span>
                  </li>
                </ul>
              </div>

              {PLAN_PERKS[plan.name.toUpperCase() as keyof typeof PLAN_PERKS] && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Additional Perks</h4>
                  <ul className="space-y-2">
                    {Object.entries(PLAN_PERKS[plan.name.toUpperCase() as keyof typeof PLAN_PERKS]).map(([key, value]) => (
                      <li key={key} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 