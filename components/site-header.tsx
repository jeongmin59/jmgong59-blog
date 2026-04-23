import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

// Mobile-only header — hidden on lg+ (sidebar takes over)
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-2 lg:hidden"
      style={{
        background: "var(--ui-layer)",
        borderBottom: "2px solid var(--line-strong)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18), var(--shadow-sm)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Link href="/" className="flex items-center gap-2 font-bold text-sm">
        <span
          className="flex h-7 w-7 items-center justify-center border-2 text-xs font-black"
          style={{
            borderColor: "var(--line-strong)",
            background: "var(--accent)",
            color: "var(--background)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45), 0 2px 0 var(--border-2)",
          }}
        >
          B
        </span>
        <span style={{ color: "var(--foreground)" }}>{siteConfig.author}</span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
