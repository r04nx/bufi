'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { 
  Download, 
  FileSpreadsheet, 
  FilePieChart, 
  FileBarChart,
  Plus
} from "lucide-react"
import { ReportForm } from "./report-form"
import { ReportsList } from "./reports-list"
import { GenerateReport } from "./generate-report"

export default function ReportsPage() {
  const [showNewReport, setShowNewReport] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <Button onClick={() => setShowNewReport(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ReportsList />
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <ReportsList type="financial" />
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <ReportsList type="tax" />
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <ReportsList type="custom" />
        </TabsContent>
      </Tabs>

      <GenerateReport 
        open={showNewReport} 
        onClose={() => setShowNewReport(false)} 
      />
    </div>
  )
} 