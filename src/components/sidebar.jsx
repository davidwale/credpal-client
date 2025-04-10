"use client"
import { Link } from "react-router-dom"
// import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Wallet,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react"

const Sidebar = () => {
  // const pathname = usePathname()

  const mainNavItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
    { name: "Spot Orders", href: "/dashboard/spot-orders", icon: ShoppingCart },
    { name: "Margin Orders", href: "/dashboard/margin-orders", icon: ShoppingCart },
    { name: "Transactions", href: "/dashboard/transactions", icon: BarChart3 },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  ]

  const otherNavItems = [
    { name: "Notification", href: "/dashboard/notification", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Logout", href: "/logout", icon: LogOut },
    { name: "Help", href: "/help", icon: HelpCircle },
  ]

  return (
    <div className="flex flex-col h-full bg-black text-white w-[120px] md:w-[200px] py-4">
      <div className="px-4 py-2 mb-6">
        <div className="flex items-center">
        <div className="bg-yellow-500 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-8">
            <span className="font-bold text-black text-xl">B</span>
          </div>
          <span className="font-bold text-lg">BEAM</span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="mb-2 px-4">
          <p className="text-xs text-gray-400 font-medium">MAIN</p>
        </div>
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => {
            const isActive = item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? " text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 mb-2 px-4">
          <p className="text-xs text-gray-400 font-medium">OTHERS</p>
        </div>
        <nav className="space-y-1 px-2">
          {otherNavItems.map((item) => {
            const isActive = item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? " text-white" : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

    </div>
  )
}

export default Sidebar
