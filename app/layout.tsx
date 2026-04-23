import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteSidebar } from "@/components/site-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { createBaseMetadata } from "@/lib/metadata";

export const metadata: Metadata = createBaseMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Mona12.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Mona12TextKR.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Mona12-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen p-2 md:p-3">
            <div className="game-shell mx-auto flex min-h-[calc(100vh-1rem)] max-w-[1460px]">
              {/* Left sidebar — desktop only */}
              <SiteSidebar />

              {/* Main content column */}
              <div className="retro-main flex min-w-0 flex-1 flex-col">
                {/* Mobile-only header */}
                <SiteHeader />
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
