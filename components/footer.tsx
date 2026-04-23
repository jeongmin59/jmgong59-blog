import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--ui-layer)",
        borderTop: "2px solid var(--line-strong)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 -8px 20px rgba(5,5,19,0.28)",
      }}
    >
      <div className="container-shell py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-start">
          {/* Branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center border-2 text-xs font-black"
                style={{
                  borderColor: "var(--line-strong)",
                  background: "var(--accent)",
                  color: "#221433",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45), 0 2px 0 rgba(11,8,37,0.75)",
                }}
              >
                B
              </span>
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                {siteConfig.name}
              </span>
            </div>
            <p className="max-w-[200px] text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {siteConfig.description}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p
              className="mb-1 text-xs font-bold uppercase"
              style={{ color: "var(--accent)", letterSpacing: "var(--tracking-label)" }}
            >
              링크
            </p>
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="nav-link text-sm font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div
              className="border-2 px-3 py-1 text-xs font-bold"
              style={{
                borderColor: "var(--line-strong)",
                background: "rgba(255,255,255,0.08)",
                color: "var(--accent-2)",
                letterSpacing: "var(--tracking-label)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(3,3,13,0.25)",
              }}
            >
              © {new Date().getFullYear()} {siteConfig.author}
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Built with Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
