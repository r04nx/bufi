"use client"

import { Bell, Check, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  {
    id: "1",
    title: "New Invoice Paid",
    description: "Invoice #1234 has been paid",
    time: "5 minutes ago",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Low Balance Alert",
    description: "Your account balance is below ₹10,000",
    time: "1 hour ago",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "New Customer",
    description: "TechCorp Ltd. has been added as a customer",
    time: "2 hours ago",
    type: "info",
    read: true,
  },
]

export function NotificationsPanel() {
  const [unreadCount, setUnreadCount] = useState(2)
  const [activeNotifications, setActiveNotifications] = useState(notifications)

  const markAsRead = (id: string) => {
    setActiveNotifications(
      activeNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
    setUnreadCount(Math.max(0, unreadCount - 1))
  }

  const clearAll = () => {
    setActiveNotifications([])
    setUnreadCount(0)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          </div>
        </SheetHeader>
        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            {activeNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between rounded-lg border p-4 ${
                  notification.read ? "bg-muted" : "bg-background"
                }`}
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setActiveNotifications(activeNotifications.filter((n) => n.id !== notification.id))
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="unread" className="mt-4 space-y-4">
            {activeNotifications
              .filter((n) => !n.read)
              .map((notification) => (
                <div key={notification.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="archived" className="mt-4">
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No archived notifications
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

