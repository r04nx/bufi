import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const transaction = await db.transaction.create({
      data: {
        userId: session.user.id,
        amount: parseFloat(body.amount),
        type: body.type,
        category: body.category,
        description: body.description,
        date: new Date(body.date),
        status: body.status,
      },
    })
    return NextResponse.json(transaction)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to add transaction" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const transactions = await db.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
} 