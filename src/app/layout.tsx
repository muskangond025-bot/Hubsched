import type { Metadata } from "next";
import "./globals.css";
import "./dumemearts.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { AgentationProvider } from "@/components/AgentationProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "HubSched - Smart Attendance, HRMS & Workspace Management",
  description: "Hubsched is a smart workspace management & HRMS software offering attendance tracking, leave management, geolocation check-ins, payroll support & team productivity tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col cursor-none">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScroll>
            <Cursor />
            {children}
          </SmoothScroll>
          <AgentationProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
