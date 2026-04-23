import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: post.date,
  }));

  return [{ url: absoluteUrl("/"), lastModified: new Date().toISOString() }, ...posts];
}
