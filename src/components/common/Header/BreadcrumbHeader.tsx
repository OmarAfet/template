import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import navigationData, { NavItemConfig } from "@/config/navigations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const formatSegment = (segment: string): string => {
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export default function BreadcrumbHeader() {
  const pathname = usePathname();
  const homeNavItem = navigationData.find(
    (item): item is NavItemConfig => 'href' in item && item.href === "/"
  );

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="hidden md:flex ml-2">
      <BreadcrumbList>
        {pathSegments.length > 0 && homeNavItem && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={homeNavItem.href}>{homeNavItem.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {pathSegments.length === 0 && homeNavItem && (
          <BreadcrumbItem>
            <BreadcrumbPage>{homeNavItem.name}</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          const navItem = navigationData.find(
            (item): item is NavItemConfig => 'href' in item && item.href === href
          );

          const displayName = navItem ? navItem.name : formatSegment(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
