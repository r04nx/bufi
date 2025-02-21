import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Bell, ChevronDown, Menu, Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNav } from "./nav"

export const metadata: Metadata = {
  title: "Dashboard - BUFI",
  description: "Example dashboard app built using the components.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0">
            <DashboardNav />
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:gap-8">
          <Link href="/" className="hidden md:flex items-center gap-2">
            <Image
              src="/assets/logo-black-bg.svg"
              alt="BUFI Logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="font-bold">BUFI</span>
          </Link>
          <form className="flex-1 md:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-background pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </form>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <Button variant="ghost" className="gap-2">
              <span className="hidden md:inline-flex">Account</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 grid md:grid-cols-[250px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <DashboardNav />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

