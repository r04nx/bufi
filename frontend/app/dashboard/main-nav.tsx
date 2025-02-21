"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/assets/logo-black-bg.svg"
          alt="BUFI Logo"
          width={32}
          height={32}
          className="dark:invert"
        />
        <span className="font-bold">BUFI</span>
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/customers"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/customers"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Customers
      </Link>
      <Link
        href="/dashboard/transactions"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/transactions"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Transactions
      </Link>
    </nav>
  )
} 