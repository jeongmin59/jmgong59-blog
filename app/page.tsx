import { Cloud } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { GameHud } from "@/components/game-hud";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="retro-stage flex-1 p-4 md:p-8">
      <div className="mx-auto max-w-[920px]">
        <section className="start-screen mb-6 md:mb-8">
          <div className="start-screen__sky">
            <Cloud className="cloud cloud--left" size={20} strokeWidth={2.2} aria-hidden="true" />
            <Cloud className="cloud cloud--right" size={20} strokeWidth={2.2} aria-hidden="true" />
          </div>

          <div className="start-panel">
            <p className="start-label">ARCADE LOG</p>
            <h1 className="start-title">GAME START</h1>

            <div className="start-loader" aria-hidden="true">
              <div className="start-loader__track">
                <div className="start-loader__bar" />
              </div>
            </div>

            <div className="start-actions" aria-hidden="true">
              <span className="arcade-btn arcade-btn--coral">PLAY</span>
              <span className="arcade-btn arcade-btn--gold">MENU</span>
              <span className="arcade-btn arcade-btn--cyan">EXIT</span>
            </div>
          </div>
        </section>

        <GameHud
          title="PLAYER STATUS"
          items={[
            { label: "MODE", value: "HOME" },
            { label: "POSTS", value: String(posts.length) },
            { label: "THEME", value: "RETRO" },
          ]}
        />

        <div
          className="mb-4 px-4 py-2 text-xs font-bold uppercase"
          style={{
            background: "var(--ui-layer)",
            border: "2px solid var(--line-strong)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15), 0 0 18px rgba(0,0,0,0.25)",
            color: "var(--accent-2)",
            letterSpacing: "0.14em",
          }}
        >
          STAGE SELECT: RECENT POSTS ({posts.length})
        </div>

        {posts.length === 0 ? (
          <div
            className="px-6 py-16 text-center text-sm"
            style={{
              background: "var(--ui-layer)",
              border: "2px solid var(--line-strong)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
              color: "var(--muted)",
            }}
          >
            NO POSTS YET.
          </div>
        ) : (
          <div
            style={{
              border: "2px solid var(--line-strong)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.16), 0 16px 30px rgba(4, 5, 22, 0.55)",
              background: "var(--ui-layer)",
            }}
          >
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} isLast={i === posts.length - 1} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
