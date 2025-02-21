"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, CreditCard, FileText, Home, LineChart, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Financial Health",
    href: "/dashboard/financial-health",
    icon: LineChart,
  },
  {
    title: "Cash Flow",
    href: "/dashboard/cash-flow",
    icon: BarChart3,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
  },
  {
    title: "Banking",
    href: "/dashboard/banking",
    icon: CreditCard,
  },
  {
    title: "Business Profile",
    href: "/dashboard/profile",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex-1">
        {items.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start gap-2", pathname === item.href && "bg-primary/10")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

