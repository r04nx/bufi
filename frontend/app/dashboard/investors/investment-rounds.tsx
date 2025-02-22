"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function InvestmentRounds() {
  // Example data - replace with actual data from your API
  const rounds = [
    {
      id: "1",
      name: "Seed Round",
      date: "2023-01-15",
      amount: 500000,
      investors: 3,
      status: "Completed",
    },
    {
      id: "2",
      name: "Series A",
      date: "2023-06-20",
      amount: 2000000,
      investors: 5,
      status: "Completed",
    },
    {
      id: "3",
      name: "Series B",
      date: "2024-01-10",
      amount: 5000000,
      investors: 4,
      status: "In Progress",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Rounds</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Round</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Investors</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds.map((round) => (
              <TableRow key={round.id}>
                <TableCell className="font-medium">{round.name}</TableCell>
                <TableCell>{new Date(round.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(round.amount)}
                </TableCell>
                <TableCell className="text-right">{round.investors}</TableCell>
                <TableCell>
                  <Badge
                    variant={round.status === "Completed" ? "success" : "secondary"}
                  >
                    {round.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 