'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { X } from "lucide-react"
import { toast } from "sonner"

interface ReportFormProps {
  onClose: () => void
  onGenerate: () => void
}

export function ReportForm({ onClose, onGenerate }: ReportFormProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [formData, setFormData] = useState({
    type: "",
    name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validation
    if (!formData.type || !formData.name || !startDate || !endDate) {
      toast.error("Please fill in all fields")
      return
    }

    if (startDate > endDate) {
      toast.error("Start date cannot be after end date")
      return
    }

    // Show loading state
    toast.promise(
      // Simulate API call
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Generating report...',
        success: () => {
          onGenerate()
          onClose()
          return 'Report generated successfully!'
        },
        error: 'Failed to generate report',
      }
    )
  }

  return (
    <Card className="border-t-4 border-t-orange-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generate New Report</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Financial Performance</SelectItem>
                <SelectItem value="tax">Tax Summary</SelectItem>
                <SelectItem value="investor">Investor Update</SelectItem>
                <SelectItem value="custom">Custom Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Report Name</Label>
            <Input 
              placeholder="Enter report name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Generate Report
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 