"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface Document {
  id: string
  title: string
  type: 'invoice' | 'transaction'
  date: string
  amount: number
  status: string
  file: string
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Invoice #1234',
    type: 'invoice',
    date: '2024-03-15',
    amount: 5000,
    status: 'paid',
    file: '/invoices/1234.pdf'
  },
  {
    id: '2',
    title: 'Invoice #1235',
    type: 'invoice',
    date: '2024-03-14',
    amount: 7500,
    status: 'pending',
    file: '/invoices/1235.pdf'
  },
  {
    id: '3',
    title: 'Bank Transfer',
    type: 'transaction',
    date: '2024-03-13',
    amount: 3000,
    status: 'completed',
    file: '/transactions/bt-1.pdf'
  },
  {
    id: '4',
    title: 'Supplier Payment',
    type: 'transaction',
    date: '2024-03-12',
    amount: 2500,
    status: 'completed',
    file: '/transactions/sp-1.pdf'
  }
]

export function DocumentList({ type }: { type: 'invoice' | 'transaction' }) {
  const filteredDocs = documents.filter(doc => doc.type === type)

  return (
    <div className="grid gap-4">
      {filteredDocs.map((doc) => (
        <Card key={doc.id} className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{doc.title}</h4>
                <Badge variant={doc.status === 'paid' ? 'default' : 'secondary'}>
                  {doc.status}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{new Date(doc.date).toLocaleDateString()}</span>
                <span>{formatCurrency(doc.amount)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 