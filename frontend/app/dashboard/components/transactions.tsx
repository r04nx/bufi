"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Download, Filter, Search, SortAsc, SortDesc } from "lucide-react"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  category: string
  status: 'completed' | 'pending' | 'failed'
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-03-15",
    description: "Client Payment - ABC Corp",
    amount: 15000,
    type: "credit",
    category: "Sales",
    status: "completed"
  },
  // Add more transactions...
]

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredTransactions = transactions
    .filter(tx => 
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'all' || tx.category === filterCategory)
    )
    .sort((a, b) => 
      sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    )

  const exportTransactions = () => {
    const csv = [
      ['Date', 'Description', 'Amount', 'Type', 'Category', 'Status'],
      ...filteredTransactions.map(tx => [
        tx.date,
        tx.description,
        tx.amount.toString(),
        tx.type,
        tx.category,
        tx.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Expenses">Expenses</SelectItem>
              {/* Add more categories */}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          >
            {sortOrder === 'desc' ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <SortAsc className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Button onClick={exportTransactions}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  {new Date(tx.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell className={tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                </TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>
                  <Badge variant={
                    tx.status === 'completed' ? 'default' :
                    tx.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
} 