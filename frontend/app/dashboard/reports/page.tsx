'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  FilePlus,
  FileSpreadsheet,
  Download,
  Plus
} from "lucide-react"
import { ReportForm } from "./report-form"
import { ReportsList } from "./reports-list"
import { GenerateReport } from "./generate-report"
import { toast } from "sonner"

export default function ReportsPage() {
  const [showNewReport, setShowNewReport] = useState(false)
  const [metrics, setMetrics] = useState({
    total: 24,
    monthly: 8,
    downloads: 156,
    custom: 12
  })

  const handleNewReport = () => {
    setMetrics(prev => ({
      ...prev,
      total: prev.total + 1,
      monthly: prev.monthly + 1
    }))
    toast.success("Report generated successfully!")
  }

  const handleDownload = () => {
    setMetrics(prev => ({
      ...prev,
      downloads: prev.downloads + 1
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <Button onClick={() => setShowNewReport(true)} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:border-orange-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.total}</div>
          </CardContent>
        </Card>

        <Card className="hover:border-orange-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated This Month</CardTitle>
            <FilePlus className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.monthly}</div>
          </CardContent>
        </Card>

        <Card className="hover:border-orange-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.downloads}</div>
          </CardContent>
        </Card>

        <Card className="hover:border-orange-500/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Reports</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.custom}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger 
            value="list"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Reports List
          </TabsTrigger>
          <TabsTrigger 
            value="generate"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Generate Report
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <ReportsList />
        </TabsContent>
        <TabsContent value="generate" className="space-y-4">
          <GenerateReport />
        </TabsContent>
      </Tabs>

      {showNewReport && (
        <ReportForm 
          onClose={() => setShowNewReport(false)} 
          onGenerate={handleNewReport}
        />
      )}
    </div>
  )
} 