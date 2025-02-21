"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { UserNav } from "./user-nav"
import { MainNav } from "./main-nav"
import { Search } from "./search"
import { DashboardNav } from "./nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <DashboardNav />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
} 