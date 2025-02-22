"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download, MoreVertical } from "lucide-react"
import { toast } from "sonner"

export function ReportsList() {
  const [reports, setReports] = useState([
    {
      id: "1",
      name: "Financial Performance Q1 2024",
      type: "Financial",
      generated: "2024-03-15",
      status: "Ready",
      downloads: 0
    },
    {
      id: "2",
      name: "Tax Summary 2023-24",
      type: "Tax",
      generated: "2024-03-10",
      status: "Ready",
    },
    {
      id: "3",
      name: "Investor Update March 2024",
      type: "Investor",
      generated: "2024-03-01",
      status: "Ready",
    },
  ])

  const handleDownload = (reportId: string) => {
    // Mock download functionality
    const report = reports.find(r => r.id === reportId)
    if (report) {
      toast.success(`Downloading ${report.name}...`)
      // Simulate download delay
      setTimeout(() => {
        toast.success(`${report.name} downloaded successfully!`)
        setReports(prev => prev.map(r => 
          r.id === reportId 
            ? { ...r, downloads: (r.downloads || 0) + 1 }
            : r
        ))
      }, 1500)
    }
  }

  const handleDelete = (reportId: string) => {
    toast.success("Report deleted successfully!")
    setReports(prev => prev.filter(r => r.id !== reportId))
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Generated Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Report Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Generated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="hover:bg-orange-50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    {report.name}
                  </div>
                </TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{new Date(report.generated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:text-orange-500"
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:text-orange-500"
                      onClick={() => handleDelete(report.id)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 