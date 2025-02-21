"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  LineChart,
  ArrowUpRight,
} from "lucide-react"

const recommendations = [
  {
    type: "opportunity",
    title: "Increase Cash Flow",
    description: "Consider invoice factoring to improve immediate cash availability.",
    impact: "High",
    icon: DollarSign,
    action: "Explore Options",
  },
  {
    type: "alert",
    title: "Operating Costs",
    description: "Your operating costs are 15% higher than industry average.",
    impact: "Medium",
    icon: AlertCircle,
    action: "Review Costs",
  },
  {
    type: "insight",
    title: "Growth Potential",
    description: "Current profit margins indicate room for expansion.",
    impact: "High",
    icon: TrendingUp,
    action: "View Analysis",
  },
  {
    type: "trend",
    title: "Revenue Trend",
    description: "Your revenue growth is outpacing the market by 12%.",
    impact: "Positive",
    icon: LineChart,
    action: "See Details",
  },
]

export function Recommendations() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((rec) => {
          const Icon = rec.icon
          return (
            <Card key={rec.title} className="p-6">
              <div className="flex items-start gap-4">
                <div className={`
                  rounded-full p-2
                  ${rec.type === 'opportunity' && 'bg-green-100 text-green-600'}
                  ${rec.type === 'alert' && 'bg-red-100 text-red-600'}
                  ${rec.type === 'insight' && 'bg-blue-100 text-blue-600'}
                  ${rec.type === 'trend' && 'bg-purple-100 text-purple-600'}
                `}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`
                      text-sm font-medium
                      ${rec.impact === 'High' && 'text-green-600'}
                      ${rec.impact === 'Medium' && 'text-orange-600'}
                      ${rec.impact === 'Positive' && 'text-blue-600'}
                    `}>
                      Impact: {rec.impact}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      {rec.action}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 