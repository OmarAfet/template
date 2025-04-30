"use client"

import Link from "@/components/common/Link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import navigationData, { isNavGroup, NavGroupConfig, NavItemConfig } from "@/config/navigations";
import { ChevronDown } from "lucide-react";
import * as React from "react";

// Helper component to render a single navigation item
const NavItem = ({ item, isSidebarCollapsed }: { item: NavItemConfig, isSidebarCollapsed: boolean }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild {...(isSidebarCollapsed ? { tooltip: item.name } : {})}>
      <Link href={item.href}>
        <item.icon size={16} />
        {!isSidebarCollapsed && <span>{item.name}</span>}
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

// Helper component to render a navigation group
const NavGroup = ({ group, isSidebarCollapsed }: { group: NavGroupConfig, isSidebarCollapsed: boolean }) => {
  // Initialize state based on isOpenByDefault, defaulting to true (open) if undefined
  const [isOpen, setIsOpen] = React.useState(group.isOpenByDefault ?? true);

  if (isSidebarCollapsed) {
    // Always render children icons when collapsed, remove group icon logic
    return (
      <>
        {group.children.map((item, index) => (
          <NavItem key={index} item={item} isSidebarCollapsed={true} />
        ))}
      </>
    );
  }

  if (!group.collapsible) {
    return (
      <>
        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {group.children.map((item, index) => (
              <NavItem key={index} item={item} isSidebarCollapsed={false} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible w-full">
      <SidebarGroupLabel asChild>
        <CollapsibleTrigger className="w-full flex items-center justify-between cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <span>{group.name}</span>
          <ChevronDown
            size={14}
            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
          />
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarGroupContent className="pt-1">
          <SidebarMenu>
            {group.children.map((item, index) => (
              <NavItem key={index} item={item} isSidebarCollapsed={false} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </Collapsible>
  );
};

export function NavMain() {
  const { state: sidebarState } = useSidebar();
  const isSidebarCollapsed = sidebarState === 'collapsed';

  const singleItems: NavItemConfig[] = [];
  const groups: NavGroupConfig[] = [];

  navigationData.forEach(entry => {
    if (isNavGroup(entry)) {
      groups.push(entry);
    } else {
      singleItems.push(entry);
    }
  });

  return (
    <>
      {singleItems.length > 0 && (
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {singleItems.map((item, index) => (
                <NavItem key={`single-${index}`} item={item} isSidebarCollapsed={isSidebarCollapsed} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {groups.map((group, index) => (
        <SidebarGroup key={`group-${index}`}>
          <NavGroup group={group} isSidebarCollapsed={isSidebarCollapsed} />
        </SidebarGroup>
      ))}
    </>
  )
}
