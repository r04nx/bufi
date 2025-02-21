"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import {
  Calendar,
  FileText,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
} from "lucide-react"

const activities = [
  {
    id: 1,
    type: "meeting",
    title: "Board Meeting",
    date: "2024-03-15",
    description: "Quarterly performance review with Acme Ventures",
    status: "completed",
    participants: ["Sarah Johnson", "John Smith", "Alice Brown"],
    notes: "Discussed Q1 performance and expansion plans",
  },
  {
    id: 2,
    type: "investment",
    title: "Series B Investment",
    date: "2024-02-28",
    description: "Additional investment round completed",
    amount: 2000000,
    status: "completed",
  },
  {
    id: 3,
    type: "document",
    title: "Investment Agreement",
    date: "2024-02-25",
    description: "Series B investment documentation signed",
    status: "completed",
    documentType: "legal",
  },
  {
    id: 4,
    type: "communication",
    title: "Strategy Discussion",
    date: "2024-02-20",
    description: "Email thread regarding market expansion strategy",
    status: "completed",
  },
  {
    id: 5,
    type: "meeting",
    title: "Due Diligence Meeting",
    date: "2024-04-05",
    description: "Upcoming meeting with potential new investors",
    status: "upcoming",
    participants: ["Sarah Johnson", "Mark Wilson"],
  },
]

export function InvestorActivity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recent Activities</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className={`
                rounded-full p-2
                ${activity.type === 'meeting' && 'bg-blue-100 text-blue-600'}
                ${activity.type === 'investment' && 'bg-green-100 text-green-600'}
                ${activity.type === 'document' && 'bg-orange-100 text-orange-600'}
                ${activity.type === 'communication' && 'bg-purple-100 text-purple-600'}
              `}>
                {activity.type === 'meeting' && <Calendar className="h-4 w-4" />}
                {activity.type === 'investment' && <DollarSign className="h-4 w-4" />}
                {activity.type === 'document' && <FileText className="h-4 w-4" />}
                {activity.type === 'communication' && <MessageSquare className="h-4 w-4" />}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <Badge variant={activity.status === 'upcoming' ? 'outline' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                    {activity.amount && (
                      <span>{formatCurrency(activity.amount)}</span>
                    )}
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    View Details
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {activity.participants && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activity.participants.map((participant) => (
                      <Badge key={participant} variant="outline">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 