import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import navigationData from "@/config/navigations";
import Link from "next/link"; // Import Link for client-side navigation
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadcrumbHeader() {
  const pathname = usePathname();
  const homeNavItem = navigationData.find((item) => item.href === "/");

  // Filter out empty strings resulting from splitting the root path "/"
  const pathSegments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    // Decode URI component first to handle encoded characters (e.g., %20 for space)
    const decodedSegment = decodeURIComponent(segment);
    return decodedSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Breadcrumb className="hidden md:flex ml-2"> {/* Adjusted className for responsiveness */}
      <BreadcrumbList>
        {/* Always show Home link unless we are already on the homepage */}
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

        {/* Handle the case where we are exactly on the homepage */}
        {pathSegments.length === 0 && homeNavItem && (
          <BreadcrumbItem>
            <BreadcrumbPage>{homeNavItem.name}</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {/* Map through the actual path segments */}
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          // Try to find a matching navigation item
          const navItem = navigationData.find((item) => item.href === href);
          // Use the navItem name if found, otherwise format the segment
          // This handles both static paths defined in navigationData and dynamic segments
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
              {/* Add separator if it's not the last item */}
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
