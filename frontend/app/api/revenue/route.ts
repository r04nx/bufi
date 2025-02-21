import { NextResponse } from "next/server"
import { db } from "@/lib/db" // Your database connection

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const revenue = await db.revenue.create({
      data: {
        amount: parseFloat(body.amount),
        source: body.source,
        date: new Date(body.date),
        description: body.description,
      },
    })
    return NextResponse.json(revenue)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add revenue" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const revenues = await db.revenue.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(revenues)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch revenues" },
      { status: 500 }
    )
  }
} 