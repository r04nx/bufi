"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { formatCurrency } from "@/lib/utils"

export function InvestorMetrics({ detailed = false }) {
  const investmentData = [
    { month: 'Jan', amount: 500000 },
    { month: 'Feb', amount: 750000 },
    { month: 'Mar', amount: 1000000 },
    { month: 'Apr', amount: 1200000 },
    { month: 'May', amount: 1500000 },
    { month: 'Jun', amount: 2000000 },
  ]

  const equityData = [
    { round: 'Seed', equity: 15 },
    { round: 'Series A', equity: 25 },
    { round: 'Series B', equity: 35 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Investment Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  name="Investment"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Bar 
                  dataKey="equity" 
                  fill="hsl(var(--primary))" 
                  name="Equity %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {detailed && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { quarter: 'Q1', roi: 12 },
                    { quarter: 'Q2', roi: 15 },
                    { quarter: 'Q3', roi: 18 },
                    { quarter: 'Q4', roi: 22 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis 
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="roi" 
                      stroke="hsl(var(--primary))" 
                      name="ROI"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { metric: 'Growth', actual: 85, target: 80 },
                    { metric: 'Revenue', actual: 92, target: 85 },
                    { metric: 'Market Share', actual: 78, target: 75 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis 
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                    />
                    <Legend />
                    <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual" />
                    <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
} 