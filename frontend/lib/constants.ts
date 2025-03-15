export const TRANSACTION_TYPES = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
} as const

export const TRANSACTION_STATUS = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
} as const

export const INVOICE_STATUS = {
  PAID: 'PAID',
  PENDING: 'PENDING',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
} as const

export const PLAN_TYPES = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE'
} as const

export const BILLING_PERIODS = {
  MONTHLY: 'MONTHLY',
  ANNUAL: 'ANNUAL'
} as const

export type PlanType = typeof PLAN_TYPES[keyof typeof PLAN_TYPES]
export type BillingPeriod = typeof BILLING_PERIODS[keyof typeof BILLING_PERIODS] 