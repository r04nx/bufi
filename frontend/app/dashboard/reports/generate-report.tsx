"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, FileSpreadsheet, FilePieChart } from "lucide-react"

export function GenerateReport() {
  const reportTypes = [
    {
      id: "financial",
      name: "Financial Performance",
      description: "Comprehensive financial analysis and metrics",
      icon: FileText,
    },
    {
      id: "tax",
      name: "Tax Summary",
      description: "Tax calculations and compliance report",
      icon: FileSpreadsheet,
    },
    {
      id: "investor",
      name: "Investor Update",
      description: "Key metrics and updates for investors",
      icon: FilePieChart,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {reportTypes.map((type) => {
        const Icon = type.icon
        return (
          <Card key={type.id} className="relative group">
            <CardHeader>
              <Icon className="h-8 w-8 text-muted-foreground mb-2" />
              <CardTitle className="text-lg">{type.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {type.description}
              </p>
              <Button className="w-full">Generate</Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 