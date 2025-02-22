"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building2, MoreVertical } from "lucide-react"

export function InvestorsList() {
  // Example data - replace with actual data from your API
  const investors = [
    {
      id: "1",
      name: "Acme Ventures",
      type: "VC",
      representative: "John Doe",
      totalInvestment: 1000000,
      equity: 15,
      lastActivity: "2024-02-20",
    },
    // Add more example investors...
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Representative</TableHead>
              <TableHead className="text-right">Investment</TableHead>
              <TableHead className="text-right">Equity</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investors.map((investor) => (
              <TableRow key={investor.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Building2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {investor.name}
                  </div>
                </TableCell>
                <TableCell>{investor.type}</TableCell>
                <TableCell>{investor.representative}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(investor.totalInvestment)}
                </TableCell>
                <TableCell className="text-right">{investor.equity}%</TableCell>
                <TableCell>
                  {new Date(investor.lastActivity).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 