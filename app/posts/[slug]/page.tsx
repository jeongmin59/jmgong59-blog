import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Dot, ListTree, MessageSquareText } from "lucide-react";
import { GiscusComments } from "@/components/giscus-comments";
import { GameHud } from "@/components/game-hud";
import { PostBody } from "@/components/post-body";
import { ScrollProgress } from "@/components/scroll-progress";
import { ShareButton } from "@/components/share-button";
import { Toc } from "@/components/toc";
import { compilePostSource, getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { absoluteUrl } from "@/lib/site";
import { createBlogPostingSchema, createPostMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);
  if (!post) return {};
  return createPostMetadata(post);
}

const PANEL_STYLE: React.CSSProperties = {
  background: "var(--ui-layer)",
  border: "2px solid var(--line-strong)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16), var(--shadow)",
};

const PANEL_TITLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  borderBottom: "1px solid var(--line)",
  color: "var(--accent-2)",
  letterSpacing: "0.1em",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postMeta = getAllPosts().find((item) => item.slug === slug);
  if (!postMeta) notFound();

  const post = getPostBySlug(slug);
  const code = await compilePostSource(post.body);
  const schema = createBlogPostingSchema(postMeta);

  return (
    <main className="flex-1 p-4 md:p-8">
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-[1180px]">
        <GameHud
          title="DOCUMENT STATUS"
          items={[
            { label: "MODE", value: "POST" },
            { label: "READ", value: post.readingTime },
            { label: "TAGS", value: String(post.tags.length) },
          ]}
        />
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,800px)_280px]">
          <div className="min-w-0 space-y-4">
            {/* ── Post header panel ────────────────── */}
            <div style={PANEL_STYLE}>
              {/* Window title bar */}
              <div className="flex items-center gap-3 px-4 py-2" style={PANEL_TITLE}>
                <span className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border px-2 py-0.5 text-xs font-bold uppercase"
                      style={{
                        borderColor: "var(--line)",
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--foreground)",
                        letterSpacing: "var(--tracking-label)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 pb-5">
                {/* Title */}
                <h1
                  className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.05]"
                  style={{ letterSpacing: "-0.025em", color: "var(--foreground)" }}
                >
                  {post.title}
                </h1>
                {/* Description */}
                <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
                  {post.description}
                </p>
                {/* Meta */}
                <div
                  className="mt-4 flex flex-wrap gap-4 border-t-2 pt-4 text-xs font-bold uppercase"
                  style={{
                    borderColor: "var(--line)",
                    color: "var(--muted)",
                    letterSpacing: "var(--tracking-label)",
                  }}
                >
                  <span>{formatDate(post.date)}</span>
                  <Dot size={14} style={{ color: "var(--border)" }} aria-hidden="true" />
                  <span style={{ color: "var(--accent)" }}>{post.readingTime}</span>
                </div>
              </div>

              {/* Thumbnail */}
              <div
                className="relative mx-4 mb-4 aspect-[16/9] overflow-hidden border-2"
                style={{ borderColor: "var(--line)" }}
              >
                <Image
                  src={post.resolvedThumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* ── Inline TOC (mobile/tablet) ─────── */}
            {post.toc.length > 0 && (
              <div className="lg:hidden" style={PANEL_STYLE}>
                <div
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase"
                  style={PANEL_TITLE}
                >
                  <ListTree size={12} aria-hidden="true" />
                  <span>목차</span>
                </div>
                <div className="toc-scroll max-h-64 overflow-y-auto">
                  <ul className="space-y-0.5 p-4">
                    {post.toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="toc-link flex items-center gap-1 px-2 py-1 text-sm"
                          style={{ paddingLeft: item.level === 3 ? "1.5rem" : "0.5rem" }}
                        >
                          <ChevronRight size={12} aria-hidden="true" />
                          <span>{item.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ── Post body ────────────────────────── */}
            <div style={PANEL_STYLE}>
              <div className="p-6 md:p-8">
                <PostBody code={code} />
              </div>
            </div>

            {/* ── Actions ──────────────────────────── */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: "var(--ui-layer)",
                border: "2px solid var(--line-strong)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14), var(--shadow-sm)",
              }}
            >
              <ShareButton url={absoluteUrl(`/posts/${post.slug}`)} />
            </div>

            {/* ── Comments ─────────────────────────── */}
            <div style={PANEL_STYLE}>
              <div
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase"
                style={PANEL_TITLE}
              >
                <MessageSquareText size={12} aria-hidden="true" />
                <span>댓글</span>
              </div>
              <div className="p-4">
                <GiscusComments />
              </div>
            </div>
          </div>
          {post.toc.length > 0 && (
            <div className="hidden lg:block lg:sticky lg:top-4 lg:self-start lg:pl-2">
              <Toc items={post.toc} />
            </div>
          )}
          {post.toc.length === 0 && <div className="hidden lg:block" />}
        </div>
      </div>
    </main>
  );
}
