import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile settings",
}

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6 p-6 lg:p-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your profile settings and preferences.</p>
      </div>
      <Separator />
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <div className="h-20 w-20 rounded-full bg-muted" />
                    <Button size="icon" variant="outline" className="absolute -right-2 -top-2 h-6 w-6 rounded-full">
                      <span className="sr-only">Upload profile picture</span>+
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">Upload a new profile picture</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Write a short bio about yourself" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Enter your business name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gstin">GSTIN</Label>
                <Input id="gstin" placeholder="Enter your GSTIN" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" placeholder="Enter your PAN number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea id="address" placeholder="Enter your business address" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">{/* Add notification preferences here */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

