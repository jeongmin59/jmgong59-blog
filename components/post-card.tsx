import Link from "next/link";
import { ChevronRight, ChevronsRight, Dot } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, isLast }: { post: PostMeta; isLast?: boolean }) {
  return (
    <article
      className="group relative px-4 py-4 transition-colors"
      style={{
        background: "transparent",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.14)",
      }}
    >
      {/* Hover fill */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.06)" }}
        aria-hidden="true"
      />

      {/* Left accent bar on hover */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-1 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "var(--accent-2)" }}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-3">
        <span className="relative mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
          <ChevronRight
            size={14}
            className="absolute opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: "var(--accent-2)" }}
          />
          <ChevronsRight
            size={14}
            className="absolute opacity-100 transition-opacity group-hover:opacity-0"
            style={{ color: "var(--border)" }}
          />
        </span>

        <div className="min-w-0 flex-1 pl-5">
          {/* Title */}
          <Link
            href={`/posts/${post.slug}`}
            className="block text-base font-bold leading-snug after:absolute after:inset-0 md:text-lg"
            style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
          >
            {post.title}
          </Link>

          {/* Description */}
          {post.description && (
            <p className="relative mt-1 line-clamp-1 text-sm" style={{ color: "var(--muted)" }}>
              {post.description}
            </p>
          )}

          {/* Footer row */}
          <div className="relative mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {/* Tags */}
            {(post.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {(post.tags ?? []).map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div
              className="ml-auto flex items-center gap-2 text-xs font-bold"
              style={{ color: "var(--muted)" }}
            >
              <span>{formatDate(post.date)}</span>
              <Dot size={14} style={{ color: "var(--border)" }} aria-hidden="true" />
              <span
                className="border px-1.5 py-0.5"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--tag-bg)",
                  color: "var(--accent-3)",
                }}
              >
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
