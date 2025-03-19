"use client"

import {
  FileText,
  Home,
  Inbox,
  TestTubeDiagonal
} from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/icons/Logo"
import { NavMain } from "./NavMain"
import { NavUser } from "./NavUser"

// This is sample data.
const data = {
  user: {
    name: "OmarAfet",
    email: "omarafet@example.com",
    avatar: "/avatars/OmarAfet.png",
  },
  navMain: [
    {
      name: "Home",
      icon: Home,
      href: "/"
    },
    {
      name: "About",
      icon: FileText,
      href: "/about"
    },
    {
      name: "Contact",
      icon: Inbox,
      href: "/contact"
    },
    {
      name: "/1",
      icon: TestTubeDiagonal,
      href: "/1"
    },
    {
      name: "/1/2",
      icon: TestTubeDiagonal,
      href: "/1/2"
    },
    {
      name: "/1/2/3",
      icon: TestTubeDiagonal,
      href: "/1/2/3"
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b h-12 items-center">
        <div className="flex items-center h-full">
          <Logo size={24} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
