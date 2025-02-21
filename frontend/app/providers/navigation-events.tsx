"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { TransitionLoader } from "@/components/ui/transition-loader"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleStart = () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
      setIsLoading(true)
    }

    const handleStop = () => {
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      setLoadingTimeout(timeout)
    }

    router.events?.on('routeChangeStart', handleStart)
    router.events?.on('routeChangeComplete', handleStop)
    router.events?.on('routeChangeError', handleStop)

    return () => {
      router.events?.off('routeChangeStart', handleStart)
      router.events?.off('routeChangeComplete', handleStop)
      router.events?.off('routeChangeError', handleStop)
      
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
    }
  }, [router, loadingTimeout])

  // Also handle initial page load and direct navigation
  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    setLoadingTimeout(timeout)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [pathname, searchParams])

  return isLoading ? <TransitionLoader /> : null
} 