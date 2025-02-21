import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage your account security settings",
}

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication settings.</p>
      </div>
      <Separator />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password and manage 2FA settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" placeholder="Enter current password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" placeholder="Enter new password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" placeholder="Confirm new password" />
              </div>
              <Button>Update Password</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
              </div>
              <Switch id="2fa" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-1">
                <Label>Backup Codes</Label>
                <p className="text-sm text-muted-foreground">Generate backup codes for account recovery.</p>
              </div>
              <Button variant="outline">Generate Codes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Login History</CardTitle>
            <CardDescription>Review your recent login activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  device: "Chrome on Windows",
                  location: "Mumbai, India",
                  time: "2 minutes ago",
                  status: "Current session",
                },
                {
                  device: "Safari on iPhone",
                  location: "Delhi, India",
                  time: "Yesterday at 2:30 PM",
                  status: "Signed out",
                },
                // Add more login history items
              ].map((login, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{login.device}</p>
                    <p className="text-sm text-muted-foreground">
                      {login.location} • {login.time}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{login.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Manage devices that are connected to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "iPhone 13",
                  lastActive: "Active now",
                },
                {
                  name: "Windows PC",
                  lastActive: "Active now",
                },
                {
                  name: "MacBook Pro",
                  lastActive: "2 days ago",
                },
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{device.name}</p>
                    <p className="text-sm text-muted-foreground">{device.lastActive}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

