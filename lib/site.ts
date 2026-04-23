export const siteConfig = {
  name: "Jeongmingong Archive",
  title: "정교한 기술 기록과 개인 브랜딩을 위한 블로그",
  description: "Next.js, 실험, 그리고 제품 감각을 함께 기록하는 개인 브랜딩 블로그.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  author: "Jeongmin Gong",
  email: "hello@example.com",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/jeongmin59" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Email", href: "mailto:hello@example.com" },
  ],
  defaultThumbnail: "/images/default-og.svg",
} as const;

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
