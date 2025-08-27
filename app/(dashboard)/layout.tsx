"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AuthGuard } from "@/components/auth-guard";
import { DynamicBreadcrumbs } from "@/components/dynamic-breadcrumbs";
import { UserProvider } from "@/components/user-context";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardRouteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <UserProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumbs />
            </header>
            <main className="px-4 mx-auto w-full">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </AuthGuard>
  );
}
