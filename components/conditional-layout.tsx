"use client"

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { usePathname } from "next/navigation";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
