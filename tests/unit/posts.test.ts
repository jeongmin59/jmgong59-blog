import { describe, expect, it } from "vitest";
import { createPostMetadata } from "@/lib/metadata";
import { getAllPosts, getPostBySlug, getTocFromMdx, resolveThumbnail } from "@/lib/posts";

describe("post utilities", () => {
  it("returns posts sorted newest first", () => {
    const posts = getAllPosts();

    expect(posts[0]?.slug).toBe("building-a-brand-led-blog");
    expect(posts[0]?.title).toBe("마크다운 스타일 가이드 & 컴포넌트 쇼케이스");
  });

  it("calculates reading time and fallback thumbnail", () => {
    const post = getPostBySlug("building-a-brand-led-blog");

    expect(post.readingTime).toMatch(/min read/);
    expect(resolveThumbnail()).toBe("/images/default-og.svg");
  });

  it("extracts toc and slug ids", () => {
    const toc = getTocFromMdx("## Hello World\n### Deep Dive");

    expect(toc).toEqual([
      { id: "hello-world", text: "Hello World", level: 2 },
      { id: "deep-dive", text: "Deep Dive", level: 3 },
    ]);
  });

  it("creates canonical metadata for posts", () => {
    const post = getAllPosts()[0];
    const metadata = createPostMetadata(post);

    expect(metadata.alternates?.canonical).toContain(`/posts/${post.slug}`);
  });
});
