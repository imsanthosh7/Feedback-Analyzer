import React from 'react'
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { LayoutDashboard, User, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const AppSidebar = ({ adminName = "Admin" }) => {
  return (
    <>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">Admin Panel</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <Link to="/dashboard">
            <div className="p-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-4">
              <LayoutDashboard size={18} />
              Dashboard
            </div>
          </Link>

          <Link to="/profile">
            <div className="p-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-4">
              <User size={18} />
              Profile
            </div>
          </Link>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-gray-600 border-t">
          Logged in as: <span className="font-medium">{adminName}</span>
        </div>
      </SidebarFooter>
    </>
  )
}

export default AppSidebar
