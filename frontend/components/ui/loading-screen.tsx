"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { LoadingSpinner } from "./loading-spinner"
import { motion, AnimatePresence } from "framer-motion"

const loadingMessages = [
  "Connecting securely...",
  "Preparing your dashboard...",
  "Loading financial insights...",
  "Setting up your workspace...",
]

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/assets/logo-black-bg.svg"
            alt="BUFI Logo"
            width={80}
            height={80}
            className="dark:invert"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner className="h-8 w-8" />
          
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground text-sm"
              >
                {loadingMessages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
} 