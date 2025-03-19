"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Link from "@/components/common/Link";


export function NavMain({
  items,
}: {
  items: {
    name: string
    icon: LucideIcon
    href: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {items.map((link, index) => (
              <SidebarMenuButton asChild key={index}>
                <Link href={link.href}>
                  <link.icon size={16} />
                  <span>{link.name}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
