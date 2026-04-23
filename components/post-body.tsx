import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx/mdx-components";

type MdxModule = {
  default: (props: { components: typeof mdxComponents }) => React.ReactElement;
};

export async function PostBody({ code }: { code: string }) {
  const fn = new Function(code);
  const { default: Content } = fn(runtime) as MdxModule;

  return (
    <article className="prose-shell">
      <Content components={mdxComponents} />
    </article>
  );
}
