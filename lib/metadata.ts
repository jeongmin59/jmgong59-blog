import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { PostMeta } from "@/lib/posts";

export function createBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      type: "website",
      title: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(siteConfig.defaultThumbnail),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [absoluteUrl(siteConfig.defaultThumbnail)],
    },
  };
}

export function createPostMetadata(post: PostMeta): Metadata {
  const url = absoluteUrl(`/posts/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [
        {
          url: absoluteUrl(post.resolvedThumbnail),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(post.resolvedThumbnail)],
    },
  };
}

export function createBlogPostingSchema(post: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    image: absoluteUrl(post.resolvedThumbnail),
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
  };
}
