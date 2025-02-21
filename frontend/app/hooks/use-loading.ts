"use client"

import { useState, useCallback } from "react"

export function useLoading(minimumLoadingTime = 500) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null)

  const startLoading = useCallback(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }
    setIsLoading(true)
  }, [loadingTimeout])

  const stopLoading = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, minimumLoadingTime)
    setLoadingTimeout(timeout)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [minimumLoadingTime])

  return {
    isLoading,
    startLoading,
    stopLoading,
  }
} 