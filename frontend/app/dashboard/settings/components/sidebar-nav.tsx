"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface SidebarNavProps {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-2">
      {items?.length
        ? items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:underline",
                pathname === item.href ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          ))
        : null}
    </div>
  )
}

