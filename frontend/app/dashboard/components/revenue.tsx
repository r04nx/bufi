"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Download, TrendingUp } from "lucide-react"

const revenueData = {
  summary: {
    totalRevenue: 1200000,
    growth: 15.2,
    targetAchievement: 92,
  },
  monthly: [
    { month: 'Jan', revenue: 85000, target: 90000 },
    { month: 'Feb', revenue: 92000, target: 90000 },
    // Add more months...
  ],
  sources: [
    { name: 'Product Sales', value: 60 },
    { name: 'Services', value: 25 },
    { name: 'Subscriptions', value: 15 },
  ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export function Revenue() {
  const exportChart = (chartId: string) => {
    const svgElement = document.querySelector(`#${chartId} svg`)
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement('a')
        downloadLink.download = `${chartId}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Total Revenue</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold">
              {formatCurrency(revenueData.summary.totalRevenue)}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">
                +{revenueData.summary.growth}% vs last year
              </p>
            </div>
          </div>
        </Card>
        {/* Add more summary cards */}
      </div>

      {/* Revenue Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Monthly Revenue</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportChart('monthly-revenue')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="h-[300px]" id="monthly-revenue">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--muted))" 
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue Sources</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportChart('revenue-sources')}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="h-[300px]" id="revenue-sources">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData.sources}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {revenueData.sources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
} 