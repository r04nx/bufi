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
import { 
  CreditCard, 
  Receipt, 
  AlertCircle, 
  Download,
  ChevronRight 
} from "lucide-react"

export function BillingMenu() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Example billing data - replace with actual data from your backend
  const billingInfo = {
    plan: "Pro",
    amount: "₹1,999",
    billingCycle: "monthly",
    nextBilling: "2024-04-15",
    paymentMethod: "**** **** **** 4242",
    invoices: [
      {
        id: "INV-001",
        date: "2024-03-15",
        amount: "₹1,999",
        status: "Paid"
      },
      {
        id: "INV-002",
        date: "2024-02-15",
        amount: "₹1,999",
        status: "Paid"
      }
    ]
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full justify-start px-3 py-2 rounded-lg transition-colors hover:bg-muted"
        >
          <CreditCard className="h-4 w-4 mr-3" />
          Billing
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Billing & Invoices</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Current Plan Info */}
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{billingInfo.plan} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  {billingInfo.amount} / {billingInfo.billingCycle}
                </p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                {billingInfo.paymentMethod}
              </div>
              <div className="flex items-center text-sm">
                <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                Next billing on {new Date(billingInfo.nextBilling).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setIsOpen(false)
                  router.push('/dashboard/billing/payment-method')
                }}
              >
                Update Payment
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setIsOpen(false)
                  router.push('/pricing')
                }}
              >
                Change Plan
              </Button>
            </div>
          </Card>

          {/* Recent Invoices */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Invoices</h3>
            <div className="space-y-2">
              {billingInfo.invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{invoice.amount}</span>
                    <Badge variant="outline" className="text-xs">
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setIsOpen(false)
              router.push('/dashboard/billing/invoices')
            }}
          >
            View All Invoices
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 