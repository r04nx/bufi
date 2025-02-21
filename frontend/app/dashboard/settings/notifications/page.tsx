import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Notification Settings",
  description: "Manage your notification preferences",
}

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
      </div>
      <Separator />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Choose what types of emails you want to receive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="invoice-paid">Invoice Paid</Label>
              <Switch id="invoice-paid" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="low-balance">Low Balance Alerts</Label>
              <Switch id="low-balance" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="new-customer">New Customer</Label>
              <Switch id="new-customer" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="monthly-summary">Monthly Summary</Label>
              <Switch id="monthly-summary" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>Configure your mobile push notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-all">All Notifications</Label>
              <Switch id="push-all" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-mentions">Mentions & Replies</Label>
              <Switch id="push-mentions" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-reminders">Payment Reminders</Label>
              <Switch id="push-reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Schedule</CardTitle>
            <CardDescription>Set your preferred notification timing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="quiet-hours">Quiet Hours</Label>
              <Switch id="quiet-hours" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="weekend-notifications">Weekend Notifications</Label>
              <Switch id="weekend-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Preferences</Button>
        </div>
      </div>
    </div>
  )
}

