import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RF Next Starter",
  description:
    "A minimal starter for Next.js projects that includes Next.js, Tailwind CSS, and shadcn/ui.",
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
            <div className="container mx-auto flex max-w-screen-md flex-1 flex-col px-4">
              <ClerkProvider>
                <ConvexClientProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </ConvexClientProvider>
              </ClerkProvider>
              <Toaster closeButton/>
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
