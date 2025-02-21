"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Calendar, CreditCard, Settings, User } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
              <Calendar className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/billing"))}>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Profile">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/profile"))}>
              <User className="mr-2 h-4 w-4" />
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/billing"))}>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

