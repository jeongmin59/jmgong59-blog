"use client";

import Giscus from "@giscus/react";

export function GiscusComments() {
  if (!process.env.NEXT_PUBLIC_GISCUS_REPO) {
    return null;
  }

  return (
    <Giscus
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? ""}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? ""}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? ""}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="ko"
      loading="lazy"
    />
  );
}
