import { GEMINI_API_KEY } from '@/lib/config'
import { prisma } from '@/lib/db'

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
      role: string
    }
    finishReason: string
    citationMetadata?: {
      citationSources: Array<{
        startIndex: number
        endIndex: number
        uri: string
        license?: string
      }>
    }
  }>
}

export class GeminiService {
  private static readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
  
  private static async getCompanyContext(userId: string) {
    try {
      // Get user's financial data
      const [profile, transactions, revenues] = await Promise.all([
        prisma.profile.findUnique({ where: { userId } }),
        prisma.transaction.findMany({
          where: { userId },
          orderBy: { date: 'desc' },
          take: 10
        }),
        prisma.revenue.findMany({
          where: { userId },
          orderBy: { date: 'desc' },
          take: 3
        })
      ])

      // Calculate key metrics
      const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0)
      const expenses = transactions.filter(t => t.type === 'DEBIT')
      const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)
      const cashFlow = totalRevenue - totalExpenses

      return {
        businessType: profile?.businessType || 'Unknown',
        industry: profile?.industrySector || 'Unknown',
        size: profile?.employeeCount || 0,
        annualRevenue: profile?.annualRevenue || 0,
        recentRevenue: totalRevenue,
        recentExpenses: totalExpenses,
        cashFlow,
        businessAge: profile?.businessAge || 0
      }
    } catch (error) {
      console.error('Error getting company context:', error)
      return null
    }
  }

  private static formatResponse(text: string): string {
    // Remove excessive newlines and spaces
    let formatted = text.replace(/\n{3,}/g, '\n\n')
    
    // Limit response length
    const maxLength = 500
    if (formatted.length > maxLength) {
      formatted = formatted.substring(0, maxLength) + '...'
    }

    return formatted.trim()
  }

  static async generateResponse(prompt: string, userId: string): Promise<GeminiResponse> {
    try {
      const context = await this.getCompanyContext(userId)

      const systemPrompt = `You are FinSage, a concise financial AI assistant. 
Company Context:
- Business Type: ${context?.businessType}
- Industry: ${context?.industry}
- Employees: ${context?.size}
- Annual Revenue: ${context?.annualRevenue}
- Recent Performance: Revenue ${context?.recentRevenue}, Expenses ${context?.recentExpenses}, Cash Flow ${context?.cashFlow}
- Business Age: ${context?.businessAge} years

Guidelines:
1. Keep responses brief and focused (max 2-3 paragraphs)
2. Provide actionable insights based on company context
3. Use bullet points for key recommendations
4. Include relevant metrics when applicable
5. Be direct and practical

User Query: ${prompt}`

      const response = await fetch(`${this.API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini')
      }

      const data = await response.json()
      
      // Format the response text
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        data.candidates[0].content.parts[0].text = this.formatResponse(
          data.candidates[0].content.parts[0].text
        )
      }

      return data
    } catch (error) {
      console.error('Gemini API error:', error)
      throw error
    }
  }
} 