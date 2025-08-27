import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ConditionalLayout } from "@/components/conditional-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence",
  description:
    "Track your habits, goals, and tasks with Cadence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className="flex h-full min-h-screen flex-col"
      >
        <div className="flex flex-1 flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              <ClerkProvider>
                <ConvexClientProvider>
                  <ConditionalLayout>{children}</ConditionalLayout>
                  <Toaster closeButton/>
                </ConvexClientProvider>
              </ClerkProvider>
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
