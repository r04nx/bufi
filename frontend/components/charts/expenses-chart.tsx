"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Feb",
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Mar",
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Apr",
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "May",
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
  {
    name: "Jun",
    expenses: Math.floor(Math.random() * 3000) + 500,
  },
]

export function ExpensesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip formatter={(value: number) => [`₹${value}`, "Expenses"]} cursor={{ stroke: "rgba(0, 0, 0, 0.1)" }} />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="currentColor"
          strokeWidth={2}
          dot={false}
          className="stroke-red-500"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

