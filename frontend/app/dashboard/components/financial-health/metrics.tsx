"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { formatCurrency } from "@/lib/utils"

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']

const metrics = {
  profitMargin: {
    current: 15.2,
    industry: 12.5,
    trend: [
      { month: 'Jan', value: 12 },
      { month: 'Feb', value: 13.5 },
      { month: 'Mar', value: 14.2 },
      { month: 'Apr', value: 15.2 },
    ]
  },
  operatingExpenses: {
    breakdown: [
      { name: 'Labor', value: 45 },
      { name: 'Materials', value: 25 },
      { name: 'Overhead', value: 20 },
      { name: 'Other', value: 10 }
    ]
  },
  workingCapital: {
    ratio: 1.8,
    components: {
      currentAssets: 250000,
      currentLiabilities: 138889
    }
  }
}

export function KeyMetrics() {
  return (
    <div className="space-y-6">
      {/* Profit Margin Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Profit Margin Analysis</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Current Profit Margin</p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{metrics.profitMargin.current}%</span>
              <div className="flex-1">
                <Progress value={metrics.profitMargin.current} max={20} className="h-2" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Industry Average: {metrics.profitMargin.industry}%
            </p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.profitMargin.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Operating Expenses */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Operating Expenses Breakdown</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.operatingExpenses.breakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {metrics.operatingExpenses.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {metrics.operatingExpenses.breakdown.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-medium ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Working Capital */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Working Capital Analysis</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Working Capital Ratio</p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{metrics.workingCapital.ratio}</span>
              <div className="flex-1">
                <Progress 
                  value={metrics.workingCapital.ratio * 33.33} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Current Assets</p>
              <p className="text-lg font-medium">
                {formatCurrency(metrics.workingCapital.components.currentAssets)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Liabilities</p>
              <p className="text-lg font-medium">
                {formatCurrency(metrics.workingCapital.components.currentLiabilities)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 