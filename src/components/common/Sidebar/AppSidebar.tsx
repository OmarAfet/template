"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import navigationData from "@/config/navigations"
import Logo from "@/icons/Logo"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"
import { Separator } from "@/components/ui/separator"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b h-12 items-center">
        <div className="flex items-center h-full">
          <Logo size={24} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData} />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
