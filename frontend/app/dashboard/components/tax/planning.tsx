"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import {
  Calculator,
  Calendar,
  FileText,
  TrendingDown,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react"

const planningData = {
  strategies: [
    {
      id: 1,
      title: "Section 80 Deductions",
      description: "Maximize tax benefits through various Section 80 deductions",
      potentialSavings: 150000,
      implementationStatus: 65,
      priority: "high",
      deadline: "2024-03-31",
    },
    {
      id: 2,
      title: "Investment Planning",
      description: "Strategic investments in tax-saving instruments",
      potentialSavings: 200000,
      implementationStatus: 40,
      priority: "medium",
      deadline: "2024-03-25",
    },
    {
      id: 3,
      title: "Expense Restructuring",
      description: "Optimize business expenses for better tax efficiency",
      potentialSavings: 300000,
      implementationStatus: 30,
      priority: "high",
      deadline: "2024-03-20",
    },
  ],
  recommendations: [
    {
      title: "Employee Benefits",
      description: "Restructure employee compensation for better tax efficiency",
      impact: "Medium",
      timeframe: "1-2 months",
    },
    {
      title: "Capital Expenditure",
      description: "Plan major purchases to maximize depreciation benefits",
      impact: "High",
      timeframe: "3-6 months",
    },
  ],
  compliance: {
    nextFilingDate: "2024-03-31",
    documentsRequired: ["Income Statements", "Balance Sheets", "Form 16"],
    readinessScore: 75,
  }
}

export function TaxPlanning() {
  return (
    <div className="space-y-6">
      {/* Active Tax Planning Strategies */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active Tax Planning Strategies</h3>
        {planningData.strategies.map((strategy) => (
          <Card key={strategy.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h4 className="font-medium">{strategy.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {strategy.description}
                </p>
              </div>
              <Badge variant={strategy.priority === 'high' ? 'default' : 'secondary'}>
                {strategy.priority} priority
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Implementation Progress</span>
                <span>{strategy.implementationStatus}%</span>
              </div>
              <Progress value={strategy.implementationStatus} className="h-2" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(strategy.deadline).toLocaleDateString()}</span>
                </div>
                <div className="text-green-600 font-medium">
                  Potential Savings: {formatCurrency(strategy.potentialSavings)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tax Planning Recommendations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h4 className="font-medium mb-4">Recommendations</h4>
          <div className="space-y-4">
            {planningData.recommendations.map((rec, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{rec.title}</h5>
                  <Badge variant="outline">{rec.impact} Impact</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Timeframe: {rec.timeframe}
                  </span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Plan
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium mb-4">Compliance Readiness</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Overall Readiness</span>
                <span className="font-medium">{planningData.compliance.readinessScore}%</span>
              </div>
              <Progress value={planningData.compliance.readinessScore} className="h-2" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Next Filing Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{new Date(planningData.compliance.nextFilingDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Required Documents</p>
              <div className="space-y-2">
                {planningData.compliance.documentsRequired.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 