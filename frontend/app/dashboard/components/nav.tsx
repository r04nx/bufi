import { PlansMenu } from "./plans-menu"

// In your navigation items array
const navItems = [
  // ... other items
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Plans & Usage",
    component: PlansMenu, // Use component instead of href
    icon: Crown,
  },
  // ... other items
]

// Update your navigation rendering to handle components
{navItems.map((item) => (
  <div key={item.title}>
    {item.component ? (
      <item.component />
    ) : (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
          pathname === item.href ? "bg-gray-100 dark:bg-gray-800" : ""
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.title}
      </Link>
    )}
  </div>
))} 