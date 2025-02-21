"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { AlertCircle, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const insights = [
  {
    type: "opportunity",
    title: "R&D Tax Credit",
    description: "Your development activities qualify for additional R&D credits worth approximately $75,000",
    impact: "High",
    action: "Review Eligibility",
    icon: TrendingUp,
  },
  {
    type: "risk",
    title: "Depreciation Schedule",
    description: "Current depreciation method may not be optimal for tax efficiency",
    impact: "Medium",
    action: "Optimize Schedule",
    icon: AlertTriangle,
  },
  {
    type: "compliance",
    title: "Documentation Status",
    description: "All required tax documentation is up to date",
    impact: "Good",
    action: "View Details",
    icon: CheckCircle,
  },
]

const taxCalendar = [
  {
    date: "2024-03-31",
    event: "Q1 Estimated Tax Payment",
    status: "upcoming",
    amount: 250000,
  },
  {
    date: "2024-04-15",
    event: "Annual Return Filing",
    status: "upcoming",
    amount: null,
  },
  // Add more events...
]

export function TaxInsights() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Tax Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Key Insights</h3>
        {insights.map((insight) => (
          <Card key={insight.title} className="p-4">
            <div className="flex items-start gap-4">
              <div className={`
                rounded-full p-2
                ${insight.type === 'opportunity' && 'bg-green-100 text-green-600'}
                ${insight.type === 'risk' && 'bg-red-100 text-red-600'}
                ${insight.type === 'compliance' && 'bg-blue-100 text-blue-600'}
              `}>
                <insight.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Badge variant={
                    insight.impact === 'High' ? 'default' :
                    insight.impact === 'Medium' ? 'secondary' :
                    'outline'
                  }>
                    Impact: {insight.impact}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    {insight.action}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tax Calendar */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tax Calendar</h3>
        {taxCalendar.map((event) => (
          <Card key={event.date} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{event.event}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              {event.amount && (
                <Badge variant="secondary">
                  {formatCurrency(event.amount)}
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 