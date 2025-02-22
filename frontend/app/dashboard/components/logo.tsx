"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  showText?: boolean
  className?: string
}

export function Logo({ showText = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8">
        <Image
          src="/assets/logo.png"
          alt="BuFi Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-none">BuFi</span>
          <span className="text-xs text-muted-foreground">Smart Business Finance</span>
        </div>
      )}
    </div>
  )
} 