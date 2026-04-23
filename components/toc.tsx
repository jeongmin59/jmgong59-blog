import { ChevronRight, ListTree } from "lucide-react";
import type { TocItem } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function Toc({ items }: { items: TocItem[] }) {
  if (!items.length) {
    return null;
  }

  return (
    <aside
      aria-label="목차"
      className="toc-scroll max-h-[calc(100vh-2rem)] overflow-y-auto"
      style={{
        background: "var(--ui-layer)",
        border: "2px solid var(--line-strong)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16), var(--shadow-sm)",
      }}
    >
      <div className="p-5">
        <p
          className="mb-4 flex items-center gap-1.5 pb-2 text-xs font-bold uppercase"
          style={{
            borderBottom: "1px solid var(--line)",
            letterSpacing: "var(--tracking-label)",
            color: "var(--accent-2)",
          }}
        >
          <ListTree size={12} aria-hidden="true" />
          <span>목차</span>
        </p>
        <ul role="list" className="space-y-1 text-xs">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "flex items-center gap-1 px-1 py-1 text-muted transition-colors hover:bg-accent-soft hover:text-foreground",
                  item.level === 3 && "pl-4",
                )}
              >
                <ChevronRight size={12} aria-hidden="true" />
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
