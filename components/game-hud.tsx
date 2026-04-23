type HudItem = {
  label: string;
  value: string;
};

export function GameHud({ title, items }: { title: string; items: HudItem[] }) {
  return (
    <div className="hud-bar">
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: "var(--accent)" }}>
          ◈
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.12em]">{title}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <span key={item.label} className="hud-chip">
            <span className="opacity-80">{item.label}</span>
            <span className="font-bold" style={{ color: "var(--accent)" }}>
              {item.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
