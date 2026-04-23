import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { siteConfig } from "@/lib/site";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
  draft?: boolean;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: string;
  resolvedThumbnail: string;
};

export type Post = PostMeta & {
  body: string;
  toc: TocItem[];
};

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
}

function parsePostFile(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function resolveThumbnail(thumbnail?: string) {
  return thumbnail ?? siteConfig.defaultThumbnail;
}

export function getTocFromMdx(source: string) {
  const slugger = new GithubSlugger();
  const headingPattern = /^(##|###)\s+(.+)$/gm;
  const toc: TocItem[] = [];

  for (const match of source.matchAll(headingPattern)) {
    const hashes = match[1];
    const rawText = match[2].trim().replace(/[`*]/g, "");
    toc.push({
      id: slugger.slug(rawText),
      text: rawText,
      level: hashes.length as 2 | 3,
    });
  }

  return toc;
}

export function getAllPosts() {
  return ensurePostsDirectory()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { frontmatter, content } = parsePostFile(slug);

      return {
        ...frontmatter,
        slug,
        tags: frontmatter.tags ?? [],
        readingTime: readingTime(content).text,
        resolvedThumbnail: resolveThumbnail(frontmatter.thumbnail),
      } satisfies PostMeta;
    })
    .filter((post) => !post.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string) {
  const { frontmatter, content } = parsePostFile(slug);

  return {
    ...frontmatter,
    slug,
    tags: frontmatter.tags ?? [],
    body: content,
    toc: getTocFromMdx(content),
    readingTime: readingTime(content).text,
    resolvedThumbnail: resolveThumbnail(frontmatter.thumbnail),
  } satisfies Post;
}

export function getAllTags() {
  const tags = new Set<string>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags ?? []) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
}

export async function compilePostSource(source: string) {
  const rehypeHeadingIds =
    () =>
    (tree: {
      children?: Array<{
        type: string;
        tagName?: string;
        children?: Array<{ type: string; value?: string }>;
        properties?: Record<string, string>;
      }>;
    }) => {
      const slugger = new GithubSlugger();

      for (const node of tree.children ?? []) {
        if (node.type !== "element" || (node.tagName !== "h2" && node.tagName !== "h3")) {
          continue;
        }

        const text = (node.children ?? [])
          .map((child) => child.value ?? "")
          .join("")
          .trim();

        node.properties = {
          ...(node.properties ?? {}),
          id: slugger.slug(text),
        };
      }
    };

  const file = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHeadingIds, [rehypePrettyCode, { theme: "github-dark" }]],
  });

  return String(file);
}
