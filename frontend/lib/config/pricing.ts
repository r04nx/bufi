import { config } from '@/lib/config'

export const PRICING_PLANS = {
  individual: [
    {
      name: 'Free',
      price: 0,
      features: [
        'Basic financial tracking',
        'Up to 100 transactions/month',
        '5 AI queries/month',
        'Basic reports',
        'Email support',
      ],
      limits: {
        transactions: 100,
        aiCredits: 5,
        users: 1,
      }
    },
    {
      name: 'Basic',
      price: Number(process.env.BASIC_PLAN_PRICE) / 100, // Convert from paise to INR
      features: [
        'Advanced financial tracking',
        'Up to 1000 transactions/month',
        '50 AI queries/month',
        'Custom reports',
        'Priority support',
        'Basic tax planning',
        'Invoice management',
        'Basic analytics',
      ],
      limits: {
        transactions: 1000,
        aiCredits: 50,
        users: 1,
      }
    },
    {
      name: 'Pro',
      price: Number(process.env.PRO_PLAN_PRICE) / 100,
      features: [
        'Unlimited transactions',
        'Unlimited AI queries',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'Advanced tax planning',
        'Revenue forecasting',
        'Custom report builder',
        'Data export',
      ],
      limits: {
        transactions: -1, // unlimited
        aiCredits: -1, // unlimited
        users: 1,
      }
    },
  ],
  business: [
    {
      name: 'Team',
      price: 4999,
      features: [
        'Up to 5 team members',
        'Unlimited transactions',
        '200 AI queries/month',
        'Team collaboration',
        'Role-based access',
        'Priority support',
        'Advanced reporting',
        'Team analytics',
        'Audit logs',
      ],
      limits: {
        transactions: -1,
        aiCredits: 200,
        users: 5,
      }
    },
    {
      name: 'Business',
      price: 9999,
      features: [
        'Up to 20 team members',
        'Unlimited transactions',
        'Unlimited AI queries',
        'Advanced team features',
        'Custom integrations',
        'API access',
        'Dedicated support',
        'Advanced compliance',
        'Custom workflows',
        'Advanced security',
      ],
      limits: {
        transactions: -1,
        aiCredits: -1,
        users: 20,
      }
    },
    {
      name: 'Enterprise',
      price: Number(process.env.ENTERPRISE_PLAN_PRICE) / 100,
      features: [
        'Unlimited team members',
        'Unlimited everything',
        'Custom features',
        'SLA support',
        'Dedicated account manager',
        'On-premise deployment option',
        'Custom security policies',
        'Advanced compliance',
        'Custom training',
        'White-label options',
      ],
      limits: {
        transactions: -1,
        aiCredits: -1,
        users: -1,
      }
    },
  ],
}

export const PLAN_PERKS = {
  FREE: {
    aiAssistant: 'Basic AI assistance',
    support: 'Community support',
    reports: 'Basic reports',
    storage: '500MB storage',
  },
  BASIC: {
    aiAssistant: 'Enhanced AI features',
    support: 'Email support',
    reports: 'Custom reports',
    storage: '2GB storage',
    extras: [
      'Priority email support',
      'Monthly insights',
      'Basic API access',
    ]
  },
  PRO: {
    aiAssistant: 'Advanced AI features',
    support: 'Priority support',
    reports: 'Advanced reports',
    storage: '10GB storage',
    extras: [
      '24/7 phone support',
      'Custom integrations',
      'Advanced API access',
      'Dedicated success manager',
    ]
  },
  ENTERPRISE: {
    aiAssistant: 'Custom AI solutions',
    support: 'Dedicated support',
    reports: 'Custom reports',
    storage: 'Unlimited storage',
    extras: [
      'Custom development',
      'On-premise deployment',
      'Custom SLA',
      'Training sessions',
    ]
  }
} 