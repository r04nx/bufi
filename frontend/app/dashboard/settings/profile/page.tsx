import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings and preferences",
}

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Manage your public profile and personal information.</p>
      </div>
      <Separator />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture and personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20">
                <div className="h-20 w-20 rounded-full bg-muted" />
                <Button size="icon" variant="outline" className="absolute -right-2 -top-2 h-6 w-6 rounded-full">
                  <span className="sr-only">Upload profile picture</span>+
                </Button>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Profile Picture</h4>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Write a short bio about yourself" className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your business details and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" placeholder="Enter your business name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sole">Sole Proprietorship</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="llp">LLP</SelectItem>
                  <SelectItem value="pvt">Private Limited</SelectItem>
                </SelectContent>
              </Select>
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
              <Textarea id="address" placeholder="Enter your business address" className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

