"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  AlertCircle,
  TrendingUp,
  Wallet,
  LineChart,
  ShieldCheck,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { KeyMetrics } from "./financial-health/metrics"
import { Recommendations } from "./financial-health/recommendations"

interface HealthScore {
  score: number
  category: string
  description: string
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
}

const healthScores: HealthScore[] = [
  {
    score: 85,
    category: "Liquidity Ratio",
    description: "Strong ability to meet short-term obligations",
    status: "good",
    trend: "up"
  },
  {
    score: 70,
    category: "Debt Management",
    description: "Moderate debt levels with good repayment capacity",
    status: "warning",
    trend: "stable"
  },
  {
    score: 90,
    category: "Cash Flow Health",
    description: "Excellent cash flow management",
    status: "good",
    trend: "up"
  },
  {
    score: 65,
    category: "Operating Efficiency",
    description: "Room for improvement in operational costs",
    status: "warning",
    trend: "down"
  }
]

export function FinancialHealth() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {healthScores.map((score) => (
            <Card key={score.category} className="p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {score.category}
                </p>
                <div className="flex items-center gap-2">
                  <Progress value={score.score} className="h-2" />
                  <span className="text-sm font-bold">{score.score}%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {score.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  {score.trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                  {score.trend === 'down' && (
                    <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
                  )}
                  {score.trend === 'stable' && (
                    <LineChart className="h-4 w-4 text-orange-500" />
                  )}
                  <span className={`
                    ${score.status === 'good' && 'text-green-500'}
                    ${score.status === 'warning' && 'text-orange-500'}
                    ${score.status === 'critical' && 'text-red-500'}
                  `}>
                    {score.status.charAt(0).toUpperCase() + score.status.slice(1)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Financial Health Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Overall Financial Health Score</p>
                <p className="text-2xl font-bold text-green-500">78/100</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your business shows strong financial health with good liquidity and cash flow management. 
              Consider optimizing operational costs and monitoring debt levels for improved performance.
            </p>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="metrics">
        <KeyMetrics />
      </TabsContent>

      <TabsContent value="recommendations">
        <Recommendations />
      </TabsContent>
    </Tabs>
  )
} 