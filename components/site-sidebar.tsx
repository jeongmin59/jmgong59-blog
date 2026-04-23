import Link from "next/link";
import { ArrowUpRight, House, Sparkles, SunMoon, Tags } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { getAllTags } from "@/lib/posts";
import { ThemeToggle } from "@/components/theme-toggle";

const PANEL: React.CSSProperties = {
  background: "var(--ui-layer)",
  border: "2px solid var(--line-strong)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18), var(--shadow-sm)",
};

const PANEL_TITLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  borderBottom: "1px solid var(--line)",
  color: "var(--accent-2)",
  letterSpacing: "0.1em",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
};

export function SiteSidebar() {
  const tags = getAllTags();

  return (
    <aside
      className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col gap-3 overflow-y-auto p-3 lg:flex"
      style={{
        background: "var(--surface-2)",
        borderRight: "2px solid var(--line-strong)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16)",
      }}
    >
      {/* ── Profile panel ─────────────────────── */}
      <div style={PANEL}>
        <div
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-center text-xs font-bold uppercase"
          style={PANEL_TITLE}
        >
          <Sparkles size={12} aria-hidden="true" />
          <span>프로필</span>
          <Sparkles size={12} aria-hidden="true" />
        </div>
        <div className="flex flex-col items-center gap-2 p-4">
          {/* Avatar */}
          <div
            className="flex h-14 w-14 items-center justify-center border-4 text-2xl font-black"
            style={{
              borderColor: "var(--line-strong)",
              background: "var(--accent)",
              color: "var(--background)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.4), 0 4px 0 var(--border-2)",
            }}
          >
            B
          </div>
          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
              {siteConfig.author}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--accent)" }}>
              RETRO DEV LOG
            </p>
          </div>
          <p
            className="text-center text-xs leading-relaxed"
            style={{ color: "var(--muted)", borderTop: "1px solid var(--line)" }}
          >
            <span className="mt-2 block pt-2">{siteConfig.description}</span>
          </p>
        </div>
      </div>

      {/* ── Navigation panel ──────────────────── */}
      <div style={PANEL}>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase"
          style={PANEL_TITLE}
        >
          <House size={12} aria-hidden="true" />
          <span>메뉴</span>
        </div>
        <nav className="flex flex-col p-1">
          <Link
            href="/"
            className="sidebar-nav-item flex items-center gap-2 px-3 py-2 text-sm font-bold"
          >
            <House size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
            <span>홈</span>
          </Link>
          {siteConfig.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="sidebar-nav-item flex items-center gap-2 px-3 py-2 text-sm font-bold"
            >
              <ArrowUpRight size={14} style={{ color: "var(--muted)" }} aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* ── Topics panel ──────────────────────── */}
      {tags.length > 0 && (
        <div style={PANEL}>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase"
            style={PANEL_TITLE}
          >
            <Tags size={12} aria-hidden="true" />
            <span>토픽</span>
          </div>
          <div className="flex flex-wrap gap-1.5 p-3">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Theme toggle ──────────────────────── */}
      <div className="mt-auto flex items-center justify-between px-1 pb-1">
        <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
          <SunMoon size={12} aria-hidden="true" />
          <span>테마 전환</span>
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
