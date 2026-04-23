import type { MDXComponents } from "mdx/types";
import clsx from "clsx";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { MdxImage } from "@/components/mdx/mdx-image";

export const mdxComponents: MDXComponents = {
  Callout,
  code: CodeBlock,
  img: MdxImage,
  blockquote: (props) => <blockquote {...props} className={clsx("mdx-quote", props.className)} />,
  table: (props) => <table {...props} className={clsx("mdx-table", props.className)} />,
  th: (props) => <th {...props} className={clsx("mdx-table__th", props.className)} />,
  td: (props) => <td {...props} className={clsx("mdx-table__td", props.className)} />,
};
