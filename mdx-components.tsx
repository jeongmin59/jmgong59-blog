import { mdxComponents } from "@/components/mdx/mdx-components";

export function useMDXComponents(components: Record<string, unknown>) {
  return {
    ...mdxComponents,
    ...components,
  };
}
