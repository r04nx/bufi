# BUFI - Smart Business Financial Intelligence

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)

A comprehensive SMB (Small and Medium Business) Financial Health Dashboard that empowers businesses with AI-powered financial insights, automated bookkeeping, cash flow management, and intelligent business analytics.

## 🚀 Overview

BUFI is a full-stack financial management platform designed specifically for growing businesses. It combines modern web technologies with AI-powered financial analysis to provide actionable insights for business owners, investors, and financial stakeholders.

### 🎯 Key Value Propositions

- **📊 Real-time Financial Health Monitoring**: Track business metrics with automated insights
- **🤖 AI-Powered Financial Assistant (FinSage)**: Intelligent chatbot for financial planning and analysis
- **💰 Comprehensive Cash Flow Management**: Monitor income, expenses, and cash burn rates
- **📈 Predictive Analytics**: AI-driven forecasting for revenue and expense trends
- **🏦 Bank Integration**: Secure API connections with real-time transaction monitoring
- **📋 Automated Compliance**: Tax calculation, GST management, and regulatory compliance
- **👥 Investor Relations**: Stakeholder management and investment tracking

## ✨ Features

### 💼 Core Financial Management
- **Revenue Tracking**: Multi-source income monitoring with growth analysis
- **Expense Management**: Categorized spending with budget alerts and optimization insights
- **P&L Visualization**: Automated profit and loss statements with trend analysis
- **Cash Burn Analysis**: Runway estimation and sustainability metrics
- **Invoice Management**: Create, send, and track invoices with automated reminders

### 🧠 AI-Powered Insights
- **FinSage Assistant**: Conversational AI for financial queries and planning
- **Predictive Analytics**: Future profit projections and seasonal analysis
- **Smart Categorization**: Automatic transaction categorization using ML
- **Risk Assessment**: Business health scoring and early warning systems
- **Optimization Recommendations**: AI-suggested improvements for financial efficiency

### 🔗 Integrations & Automation
- **Bank API Integration**: Real-time account monitoring (RBI Account Aggregator)
- **Payment Gateway Support**: Razorpay, Stripe, PayU integrations
- **Tax Automation**: GST calculation and compliance tracking
- **Document Management**: Automated financial document organization
- **Reporting Engine**: Customizable financial reports and analytics

### 👥 Stakeholder Management
- **Investor Dashboard**: Track investments, equity, and stakeholder communications
- **Team Collaboration**: Multi-user access with role-based permissions
- **Client Management**: Customer analysis and revenue distribution insights
- **Compliance Tracking**: Regulatory requirements and deadline management

## 🛠️ Technology Stack

### Frontend
```json
{
  "framework": "Next.js 14.2",
  "language": "TypeScript",
  "styling": "Tailwind CSS + shadcn/ui",
  "state_management": "React Query (TanStack)",
  "database": "Prisma ORM + SQLite",
  "ui_components": "Radix UI primitives",
  "charts": "Recharts",
  "authentication": "JWT + bcryptjs",
  "animations": "Framer Motion"
}
```

### Backend
```python
{
  "framework": "FastAPI 0.109",
  "language": "Python 3.8+",
  "database": "SQLAlchemy + PostgreSQL",
  "authentication": "JWT + PassLib",
  "migrations": "Alembic",
  "validation": "Pydantic 2.6",
  "async_support": "Uvicorn ASGI server",
  "email_validation": "email-validator"
}
```

### Key Dependencies

#### Frontend
```json
{
  "@radix-ui/react-*": "UI primitives and components",
  "@tanstack/react-query": "Server state management",
  "recharts": "Data visualization charts",
  "framer-motion": "Smooth animations",
  "next-themes": "Dark/light theme support",
  "zod": "Schema validation",
  "react-hook-form": "Form management"
}
```

#### Backend
```python
{
  "fastapi": "High-performance async web framework",
  "sqlalchemy": "Database ORM and query builder",
  "python-jose": "JWT token management",
  "passlib": "Password hashing and verification",
  "pydantic": "Data validation and parsing",
  "alembic": "Database migrations"
}
```

## 📦 Installation & Setup

### Prerequisites
- **Node.js 18+** and npm/yarn
- **Python 3.8+** with pip
- **PostgreSQL** (for production) or SQLite (for development)
- **Git** for version control

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/r04nx/Bufi.git
cd Bufi
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API keys

# Run database migrations
python database/migrations.py

# Start the FastAPI server
python run.py
```

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoints

# Initialize Prisma database
npm run db:push
npm run db:seed

# Start the development server
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 Usage Guide

### Getting Started
1. **Sign Up**: Create your business account with basic information
2. **Onboarding**: Complete the business profile setup wizard
3. **Bank Integration**: Connect your bank accounts for real-time data
4. **Data Import**: Upload historical financial data or connect payment gateways
5. **Dashboard Setup**: Customize your financial dashboard and metrics

### Key Workflows

#### 📊 Financial Health Monitoring
1. Navigate to **Dashboard** for overview metrics
2. View **Revenue** section for income analysis
3. Check **Transactions** for detailed expense tracking
4. Review **Reports** for comprehensive financial statements

#### 🤖 AI Assistant (FinSage)
1. Click the **FinSage** chat icon in the bottom right
2. Ask questions like:
   - "What's my cash burn rate this month?"
   - "Should I make this large purchase now?"
   - "How can I improve my profit margins?"
3. Get intelligent recommendations and insights

#### 💼 Investor Management
1. Go to **Investors** section
2. Add investor profiles and investment details
3. Track equity distribution and investment rounds
4. Generate investor reports and communications

#### 📋 Tax & Compliance
1. Visit **Tax** dashboard for compliance overview
2. Monitor GST calculations and filing deadlines
3. Track deductible expenses automatically
4. Generate tax reports and documentation

## 🏗️ Architecture

### System Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React/TS      │    │ • Python        │    │ • SQLAlchemy    │
│ • Tailwind CSS  │    │ • Pydantic      │    │ • Prisma ORM    │
│ • Prisma Client │    │ • JWT Auth      │    │ • Migrations    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Project Structure
```
Bufi/
├── frontend/                    # Next.js React application
│   ├── app/                    # App router pages
│   │   ├── dashboard/          # Main dashboard pages
│   │   ├── sign-in/           # Authentication pages
│   │   └── onboarding/        # User onboarding flow
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── charts/           # Data visualization components
│   │   └── bot/              # AI chatbot components
│   ├── lib/                  # Utility functions and configurations
│   ├── prisma/               # Database schema and migrations
│   └── types/                # TypeScript type definitions
├── backend/                   # FastAPI Python application
│   ├── app/                  # Main application code
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route handlers
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic services
│   │   └── utils/           # Utility functions
│   ├── database/            # Database configuration and migrations
│   └── requirements.txt     # Python dependencies
└── docs/                    # Documentation and assets
```

### Database Schema

#### Core Entities
- **User**: Business owner authentication and profile
- **Profile**: Detailed business information and settings
- **Transaction**: Financial transactions and categorization
- **Revenue**: Income tracking and source analysis
- **Invoice**: Billing and accounts receivable
- **Investor**: Stakeholder and investment management
- **TaxRecord**: Compliance and tax planning
- **Subscription**: Billing and plan management

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
DATABASE_URL=file:./dev.db
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Backend (.env)
```bash
DATABASE_URL=postgresql://user:password@localhost/bufi_db
JWT_SECRET_KEY=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### Database Setup

#### Development (SQLite)
```bash
cd frontend
npm run db:push
npm run db:seed
```

#### Production (PostgreSQL)
```bash
# Set up PostgreSQL database
createdb bufi_production

# Run migrations
cd backend
python database/migrations.py
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend

# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Backend Testing
```bash
cd backend

# Run unit tests
python -m pytest tests/

# Run with coverage
python -m pytest tests/ --cov=app
```

## 🚀 Deployment

### Production Deployment

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
cd frontend
vercel --prod
```

#### Backend (Railway/Heroku)
```bash
# Build Docker image
docker build -t bufi-backend ./backend

# Deploy to Railway
railway deploy

# Or deploy to Heroku
heroku container:push web -a your-app-name
heroku container:release web -a your-app-name
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📊 Features in Detail

### 🤖 FinSage AI Assistant
- **Natural Language Processing**: Understands financial queries in plain English
- **Contextual Responses**: Provides answers based on user's actual financial data
- **Proactive Insights**: Sends alerts and recommendations based on spending patterns
- **Learning Capability**: Improves recommendations based on user interactions

### 💰 Cash Flow Management
- **Real-time Monitoring**: Live updates from connected bank accounts
- **Predictive Modeling**: AI-powered cash flow forecasting
- **Scenario Planning**: "What-if" analysis for major financial decisions
- **Alert System**: Low balance warnings and irregular spending notifications

### 📈 Business Intelligence
- **Customer Analysis**: Identify top customers and revenue concentration
- **Expense Optimization**: Categorize and analyze spending patterns
- **Growth Metrics**: Track KPIs and business performance indicators
- **Benchmark Comparison**: Industry-standard financial ratio analysis

### 🔐 Security & Compliance
- **Data Encryption**: End-to-end encryption for sensitive financial data
- **Secure Authentication**: JWT-based auth with refresh token rotation
- **Audit Trails**: Complete transaction and access logging
- **Regulatory Compliance**: GDPR, PCI-DSS, and local financial regulations

## 🛣️ Roadmap

### Version 2.0 (Q3 2024)
- [ ] **Advanced AI Features**: Machine learning-based expense categorization
- [ ] **Mobile Application**: React Native mobile app for iOS and Android
- [ ] **Advanced Integrations**: QuickBooks, Xero, and accounting software sync
- [ ] **Multi-currency Support**: International business support
- [ ] **Advanced Reporting**: Custom report builder with drag-drop interface

### Version 1.5 (Q2 2024)
- [ ] **Real-time Collaboration**: Team features with role-based access
- [ ] **API Marketplace**: Third-party integrations and plugins
- [ ] **White-label Solution**: Customizable branding for partners
- [ ] **Advanced Analytics**: Machine learning insights and predictions

### Version 1.1 (Q1 2024)
- [x] **Enhanced UI/UX**: Improved dashboard design and user experience
- [x] **Performance Optimization**: Faster loading and real-time updates
- [x] **Security Enhancements**: Advanced authentication and data protection
- [x] **Bug Fixes**: Stability improvements and error handling

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Install** dependencies for both frontend and backend
4. **Make** your changes following the coding standards
5. **Test** your changes thoroughly
6. **Commit** your changes: `git commit -m 'Add amazing feature'`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Submit** a Pull Request

### Code Standards
- **TypeScript**: Use strict type checking and interfaces
- **Python**: Follow PEP 8 style guidelines
- **Testing**: Write unit tests for new features
- **Documentation**: Update README and inline documentation
- **Commit Messages**: Use conventional commit format

### Local Development Setup
```bash
# Install pre-commit hooks
npm install -g pre-commit
pre-commit install

# Run linting
npm run lint          # Frontend
python -m flake8      # Backend

# Format code
npm run format        # Frontend
python -m black .     # Backend
```

## 📚 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user
POST /api/auth/refresh     # Refresh access token
```

### Financial Data Endpoints
```http
GET    /api/transactions           # List transactions
POST   /api/transactions           # Create transaction
GET    /api/revenues              # List revenue records
POST   /api/revenues              # Create revenue record
GET    /api/invoices              # List invoices
POST   /api/invoices              # Create invoice
```

### Analytics Endpoints
```http
GET /api/analytics/dashboard      # Dashboard metrics
GET /api/analytics/cash-flow      # Cash flow analysis
GET /api/analytics/trends         # Financial trends
GET /api/analytics/predictions    # AI predictions
```

### AI Assistant Endpoints
```http
POST /api/bot/chat               # Send message to FinSage
GET  /api/bot/history           # Chat history
POST /api/bot/feedback          # Provide feedback
```

## 🔍 Troubleshooting

### Common Issues

#### Frontend Issues
```bash
# Clear Next.js cache
rm -rf .next/
npm run build

# Reset Prisma client
npx prisma generate
npm run db:push
```

#### Backend Issues
```bash
# Reset database
python database/migrations.py --reset

# Check API health
curl http://localhost:8000/api/health
```

#### Database Connection Issues
```bash
# Test database connection
python -c "from app.db import engine; print(engine.execute('SELECT 1').scalar())"

# Reset migrations
alembic stamp head
alembic revision --autogenerate -m "reset"
```

## 📈 Performance

### Optimization Features
- **Server-side Rendering**: Next.js SSR for faster initial page loads
- **Database Indexing**: Optimized queries with proper indexing
- **Caching Strategy**: Redis caching for frequently accessed data
- **CDN Integration**: Static asset delivery via CDN
- **Lazy Loading**: Component and route-based code splitting

### Monitoring
- **Application Metrics**: Built-in performance monitoring
- **Error Tracking**: Comprehensive error logging and alerts
- **User Analytics**: Usage patterns and feature adoption tracking
- **Infrastructure Monitoring**: Server health and resource utilization

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors & Contributors

- **r04nx** - *Project Lead & Full-Stack Developer* - [GitHub](https://github.com/r04nx)

### Contributors
We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 🙏 Acknowledgments

- **Next.js Team** - Outstanding React framework
- **FastAPI** - High-performance Python web framework
- **Radix UI** - Excellent accessible UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Next-generation database toolkit
- **shadcn/ui** - Beautiful and accessible UI components

## 📞 Support & Contact

### Getting Help
- **📚 Documentation**: [Project Wiki](https://github.com/r04nx/Bufi/wiki)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/r04nx/Bufi/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/r04nx/Bufi/discussions)
- **📧 Email**: [support@bufi.ai](mailto:support@bufi.ai)

### Business Inquiries
- **🤝 Partnerships**: [partnerships@bufi.ai](mailto:partnerships@bufi.ai)
- **💼 Enterprise**: [enterprise@bufi.ai](mailto:enterprise@bufi.ai)
- **🎯 Sales**: [sales@bufi.ai](mailto:sales@bufi.ai)

---

**⭐ Star this repository if you find it useful!**

*BUFI - Empowering businesses with intelligent financial insights.*

---

## 🏆 Awards & Recognition

- **🥇 EVOLVE SaaS Hackathon Winner** - Best Financial Technology Solution
- **🏅 Logithon Recognition** - Innovation in Business Intelligence
- **🎖️ Featured Project** - GitHub trending repositories

Built with ❤️ for the small business community.
