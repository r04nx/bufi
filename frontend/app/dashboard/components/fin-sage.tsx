"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bot,
  Send,
  Maximize2,
  Minimize2,
  Sparkles,
  LineChart,
  Brain,
  MessageSquare,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface FinancialContext {
  revenue: number
  cashFlow: number
  topExpenses: { category: string; amount: number }[]
  recentTransactions: { description: string; amount: number }[]
}

const financialContext: FinancialContext = {
  revenue: 1200000,
  cashFlow: 250000,
  topExpenses: [
    { category: "Payroll", amount: 450000 },
    { category: "Marketing", amount: 120000 },
    { category: "Operations", amount: 180000 },
  ],
  recentTransactions: [
    { description: "Client Payment", amount: 15000 },
    { description: "Software Subscription", amount: -2000 },
  ],
}

export function FinSage() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm FinSage, your financial AI assistant. I can help you analyze your business finances and suggest next best actions. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage: string) => {
    // Simulate AI response based on context
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

    let response = ""
    const lowercaseMessage = userMessage.toLowerCase()

    if (lowercaseMessage.includes("cash flow")) {
      response = `Your current cash flow is ${formatCurrency(financialContext.cashFlow)}. Based on your recent transactions, I suggest monitoring your software subscriptions as they've increased by 15% this quarter.`
    } else if (lowercaseMessage.includes("next best action") || lowercaseMessage.includes("suggest")) {
      response = "Based on your financial data, here are my top suggestions:\n1. Consider negotiating better terms with your top vendors\n2. There's an opportunity to optimize your marketing spend\n3. Your cash reserves could be better utilized in short-term investments"
    } else if (lowercaseMessage.includes("revenue")) {
      response = `Your current revenue is ${formatCurrency(financialContext.revenue)}. You're tracking 12% above last year's performance. Key growth areas are in product sales and enterprise services.`
    } else {
      response = "I understand you're asking about your finances. Could you please be more specific about what you'd like to know? I can help with cash flow analysis, revenue insights, or suggest next best actions."
    }

    setIsTyping(false)
    return response
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    const response = await generateResponse(inputValue)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, assistantMessage])
  }

  return (
    <Card className={`fixed right-4 bottom-4 z-50 transition-all duration-300 ${
      isExpanded ? 'w-96 h-[600px]' : 'w-64 h-12'
    }`}>
      <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Avatar className="h-6 w-6 bg-primary-foreground">
              <AvatarImage src="/assets/finsage-icon.png" />
              <AvatarFallback>
                <Brain className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
          </div>
          <span className="font-medium">FinSage</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <>
          <ScrollArea className="flex-1 p-4 h-[500px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  )
} 