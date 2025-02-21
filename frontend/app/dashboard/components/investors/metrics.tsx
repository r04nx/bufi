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
} from 'recharts'
import { formatCurrency } from "@/lib/utils"

const metrics = {
  valuation: {
    current: 20000000,
    previous: 15000000,
    history: [
      { date: '2023-Q1', value: 15000000 },
      { date: '2023-Q2', value: 16500000 },
      { date: '2023-Q3', value: 18000000 },
      { date: '2023-Q4', value: 20000000 },
    ]
  },
  roi: {
    current: 2.5,
    target: 3.0,
    industry: 2.2
  },
  kpis: [
    {
      name: "Revenue Growth",
      value: 85,
      target: 80,
      status: "above"
    },
    {
      name: "Customer Acquisition",
      value: 75,
      target: 85,
      status: "below"
    },
    {
      name: "Market Share",
      value: 65,
      target: 60,
      status: "above"
    }
  ]
}

export function InvestorMetrics() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Company Valuation</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                {formatCurrency(metrics.valuation.current)}
              </p>
              <p className="text-sm text-muted-foreground">
                Current Valuation
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">
                +{(((metrics.valuation.current - metrics.valuation.previous) / metrics.valuation.previous) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                vs Previous
              </p>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.valuation.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h4 className="font-medium mb-4">Return on Investment</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{metrics.roi.current}x</p>
              <div className="text-right">
                <p className="text-sm font-medium">Target: {metrics.roi.target}x</p>
                <p className="text-sm text-muted-foreground">
                  Industry Avg: {metrics.roi.industry}x
                </p>
              </div>
            </div>
            <Progress 
              value={(metrics.roi.current / metrics.roi.target) * 100} 
              className="h-2"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium mb-4">Key Performance Indicators</h4>
          <div className="space-y-4">
            {metrics.kpis.map((kpi) => (
              <div key={kpi.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{kpi.name}</p>
                  <p className={`text-sm font-medium ${
                    kpi.status === 'above' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.value}%
                  </p>
                </div>
                <Progress value={kpi.value} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Target: {kpi.target}%
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
} 