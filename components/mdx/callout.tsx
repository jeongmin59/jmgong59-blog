import { cn } from "@/lib/utils";

export function Callout({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <aside
      className={cn(
        "my-6 rounded-[1.5rem] border px-5 py-4",
        tone === "accent" ? "border-accent/40 bg-accent-soft" : "border-line bg-surface",
      )}
    >
      {children}
    </aside>
  );
}
