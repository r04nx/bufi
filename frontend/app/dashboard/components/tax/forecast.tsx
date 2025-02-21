"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
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
  Legend,
} from 'recharts'
import { AlertCircle, TrendingUp, Download } from "lucide-react"

const forecastData = {
  currentYear: {
    revenue: 12000000,
    expenses: 8000000,
    projectedTax: 1200000,
    effectiveRate: 22.5,
    previousYearTax: 980000,
  },
  monthlyForecast: [
    { month: 'Jan', income: 1000000, tax: 225000 },
    { month: 'Feb', income: 950000, tax: 213750 },
    { month: 'Mar', income: 1100000, tax: 247500 },
    { month: 'Apr', income: 980000, tax: 220500 },
    // Add more months...
  ],
  deductions: [
    { category: 'Depreciation', amount: 300000 },
    { category: 'R&D Credits', amount: 150000 },
    { category: 'Employee Benefits', amount: 200000 },
    { category: 'Other', amount: 100000 },
  ]
}

export function TaxForecast() {
  return (
    <div className="space-y-6">
      {/* Tax Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Projected Tax</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold">
              {formatCurrency(forecastData.currentYear.projectedTax)}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">
                +{(((forecastData.currentYear.projectedTax - forecastData.currentYear.previousYearTax) / forecastData.currentYear.previousYearTax) * 100).toFixed(1)}% vs last year
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Effective Tax Rate</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold">
              {forecastData.currentYear.effectiveRate}%
            </p>
            <Progress 
              value={forecastData.currentYear.effectiveRate} 
              max={35}
              className="h-2"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Tax Savings</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(750000)}
            </p>
            <p className="text-sm text-muted-foreground">
              Through deductions and credits
            </p>
          </div>
        </Card>
      </div>

      {/* Monthly Forecast Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Monthly Tax Forecast</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData.monthlyForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="income" name="Income" fill="hsl(var(--primary))" />
              <Bar yAxisId="right" dataKey="tax" name="Tax" fill="hsl(var(--destructive))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tax Deductions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Tax Deductions</h3>
        <div className="space-y-4">
          {forecastData.deductions.map((deduction) => (
            <div key={deduction.category} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{deduction.category}</p>
                <p className="text-sm text-muted-foreground">
                  Estimated deduction
                </p>
              </div>
              <Badge variant="secondary">
                {formatCurrency(deduction.amount)}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 