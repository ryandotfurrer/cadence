"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb items based on the current pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard
    breadcrumbs.push({
      label: "Home",
      href: "/dashboard",
      isCurrent: segments.length === 1 && segments[0] === "dashboard"
    });

    // Add other segments
    let currentPath = "/dashboard";
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      
      // Skip route groups (wrapped in parentheses)
      if (segment.startsWith('(') && segment.endsWith(')')) {
        continue;
      }

      currentPath += `/${segment}`;
      
      // Format the label (capitalize and handle special cases)
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Handle special cases
      if (segment === "all-tasks") label = "All Tasks";
      if (segment === "upcoming") label = "Upcoming";
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent: i === segments.length - 1
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              {breadcrumb.isCurrent ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
