import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - BUFI",
  description: "Example dashboard app built using the components.",
}

import { DashboardLayoutClient } from "./layout-client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>
}

