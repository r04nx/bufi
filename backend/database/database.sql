-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "hstore";

-- Enums
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'manager', 'accountant', 'viewer');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');
CREATE TYPE transaction_type AS ENUM ('credit', 'debit');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'canceled');
CREATE TYPE payment_method AS ENUM ('bank_transfer', 'upi', 'card', 'cash', 'other');
CREATE TYPE notification_type AS ENUM ('alert', 'warning', 'info', 'success');
CREATE TYPE integration_type AS ENUM ('banking', 'accounting', 'payment_gateway', 'erp');
CREATE TYPE report_frequency AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'yearly');

-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Business Profiles
CREATE TABLE business_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    business_type VARCHAR(50) NOT NULL,
    industry VARCHAR(100),
    gstin VARCHAR(15),
    pan_number VARCHAR(10),
    tax_identification_number VARCHAR(50),
    registration_number VARCHAR(50),
    incorporation_date DATE,
    fiscal_year_start DATE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    website VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Team Members
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}',
    invited_by UUID REFERENCES users(id),
    invitation_accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(business_id, user_id)
);

-- Subscriptions and Billing
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    status subscription_status NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    billing_cycle VARCHAR(20) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    payment_method payment_method,
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Banking and Transactions
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    account_name VARCHAR(255) NOT NULL,
    account_number VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    ifsc_code VARCHAR(20),
    account_type VARCHAR(50),
    currency VARCHAR(3) DEFAULT 'INR',
    current_balance DECIMAL(15,2) DEFAULT 0,
    available_balance DECIMAL(15,2) DEFAULT 0,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    bank_account_id UUID REFERENCES bank_accounts(id),
    type transaction_type NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    description TEXT,
    category VARCHAR(100),
    sub_category VARCHAR(100),
    transaction_date DATE NOT NULL,
    value_date DATE,
    reference_number VARCHAR(100),
    balance_after DECIMAL(15,2),
    metadata JSONB,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers and Invoicing
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    gstin VARCHAR(15),
    pan_number VARCHAR(10),
    billing_address TEXT,
    shipping_address TEXT,
    credit_limit DECIMAL(15,2),
    payment_terms INTEGER, -- days
    notes TEXT,
    tags TEXT[],
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id),
    invoice_number VARCHAR(50) NOT NULL,
    reference_number VARCHAR(50),
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status invoice_status NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    sub_total DECIMAL(15,2) NOT NULL,
    tax_total DECIMAL(15,2) NOT NULL,
    discount_total DECIMAL(15,2) DEFAULT 0,
    total DECIMAL(15,2) NOT NULL,
    notes TEXT,
    terms_and_conditions TEXT,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    paid_date DATE,
    payment_method payment_method,
    tags TEXT[],
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,2),
    discount_rate DECIMAL(5,2),
    amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial Reports and Analytics
CREATE TABLE financial_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL,
    frequency report_frequency NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications and Alerts
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alert_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL,
    threshold DECIMAL(15,2),
    enabled BOOLEAN DEFAULT TRUE,
    notification_channels TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Integrations and Settings
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    type integration_type NOT NULL,
    provider VARCHAR(100) NOT NULL,
    credentials JSONB,
    settings JSONB,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE business_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    settings JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit and Activity Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);
CREATE INDEX idx_team_members_business_user ON team_members(business_id, user_id);
CREATE INDEX idx_transactions_business_date ON transactions(business_id, transaction_date);
CREATE INDEX idx_transactions_account_date ON transactions(bank_account_id, transaction_date);
CREATE INDEX idx_invoices_business_date ON invoices(business_id, issue_date);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_customers_business ON customers(business_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at);
CREATE INDEX idx_audit_logs_business ON audit_logs(business_id);
CREATE INDEX idx_financial_metrics_business_date ON financial_metrics(business_id, date);

-- Add triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_user_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add similar triggers for other tables with updated_at columns