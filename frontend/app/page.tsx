import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Building2, CreditCard, LineChart, PieChart, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo-black-bg.svg"
            alt="BUFI Logo"
            width={32}
            height={32}
            className="dark:invert"
          />
          <span className="text-xl font-bold text-primary">BUFI</span>
        </Link>
        <nav className="ml-6 hidden gap-6 md:flex">
          <Link className="text-sm font-medium hover:text-primary" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-primary" href="#testimonials">
            Testimonials
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)]" />
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
              <div className="max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Smart Business Finance Management
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Transform your business finances with AI-powered insights, automated bookkeeping, and real-time analytics.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href="/sign-up">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="relative mt-8 sm:mt-16 lg:col-span-5 lg:mt-0 xl:col-span-6">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                  alt="Business Analytics Dashboard"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to manage your business finances</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Comprehensive tools and insights to help you make better financial decisions.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="feature-card">
                <BarChart3 className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Financial Analytics</h3>
                <p className="mt-2 text-muted-foreground">
                  Get detailed insights into your revenue, expenses, and profit trends.
                </p>
              </Card>
              <Card className="feature-card">
                <Wallet className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Cash Flow Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Track and optimize your cash flow with real-time monitoring.
                </p>
              </Card>
              <Card className="feature-card">
                <LineChart className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Forecasting</h3>
                <p className="mt-2 text-muted-foreground">AI-powered predictions for revenue and expense trends.</p>
              </Card>
              <Card className="feature-card">
                <Building2 className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Business Health Score</h3>
                <p className="mt-2 text-muted-foreground">
                  Monitor your business health with our comprehensive scoring system.
                </p>
              </Card>
              <Card className="feature-card">
                <PieChart className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Expense Tracking</h3>
                <p className="mt-2 text-muted-foreground">Categorize and analyze your expenses automatically.</p>
              </Card>
              <Card className="feature-card">
                <CreditCard className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Invoice Management</h3>
                <p className="mt-2 text-muted-foreground">Create, send, and track invoices all in one place.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
                  alt="Business Team"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by growing businesses</h2>
                  <p className="text-lg text-muted-foreground">
                    Join thousands of businesses that use BUFI to streamline their financial operations and make data-driven decisions.
                  </p>
                  {/* Add testimonial or stats here */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Partners Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Seamless Integration</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Connect with your favorite tools and services. BUFI works with your existing business stack.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                  alt="Integration Dashboard"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate overflow-hidden bg-primary px-6 py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,var(--primary)_25%,#ff8b3d_50%,var(--primary)_75%)]" />
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your business finances?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90">
              Get started with BUFI today and take control of your business finances.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/sign-up">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                Contact Sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold text-primary">
                BUFI
              </Link>
              <p className="text-sm text-muted-foreground">Smart financial management for growing businesses</p>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold">Product</h3>
                  <ul className="mt-4 space-y-2">
                    {["Features", "Pricing", "Testimonials"].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold">Company</h3>
                  <ul className="mt-4 space-y-2">
                    {["About", "Blog", "Careers"].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold">Support</h3>
                  <ul className="mt-4 space-y-2">
                    {["Help Center", "Contact", "Status"].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold">Legal</h3>
                  <ul className="mt-4 space-y-2">
                    {["Privacy", "Terms", "Security"].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

