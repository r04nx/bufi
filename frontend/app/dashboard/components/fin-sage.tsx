"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, X, Brain } from "lucide-react"
import { FinSageIcon } from '@/components/icons'

interface Message {
  text: string
  isBot: boolean
  timestamp: Date
  citations?: Array<{
    startIndex: number
    endIndex: number
    uri: string
    license?: string
  }>
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
      role: string
    }
    finishReason: string
    citationMetadata?: {
      citationSources: Array<{
        startIndex: number
        endIndex: number
        uri: string
        license?: string
      }>
    }
  }>
}

export function FinSage() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm FinSage, your AI financial assistant. I can help analyze your finances and provide insights. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data: { response: GeminiResponse } = await response.json()
      const botResponse = data.response.candidates[0]
      
      setMessages(prev => [...prev, {
        text: botResponse.content.parts[0].text,
        isBot: true,
        timestamp: new Date(),
        citations: botResponse.citationMetadata?.citationSources
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-orange-500 to-orange-600"
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-transparent">
            <FinSageIcon className="h-6 w-6 text-white" />
          </AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-[380px] h-[600px] flex flex-col shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-white/10">
            <AvatarFallback>
              <FinSageIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">FinSage Assistant</h2>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-white/10"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}>
                <Avatar className="h-8 w-8 mt-1">
                  {message.isBot ? (
                    <>
                      <AvatarImage src="/assets/finsage-icon.png" />
                      <AvatarFallback>
                        <Brain className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>👤</AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.isBot
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-2 text-xs opacity-70">
                      <p className="font-medium">Sources:</p>
                      <ul className="list-disc list-inside">
                        {message.citations.map((citation, idx) => (
                          <li key={idx}>
                            <a 
                              href={citation.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {new URL(citation.uri).hostname}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/assets/finsage-icon.png" />
                  <AvatarFallback>
                    <Brain className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your finances..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
} 