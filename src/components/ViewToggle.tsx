"use client";

import { useEffect, useState } from "react";

export type CardView = "visual" | "classic";

export function useCardView() {
  const [view, setView] = useState<CardView>("visual");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cardView") as CardView | null;
    if (saved === "classic" || saved === "visual") setView(saved);
  }, []);

  const change = (v: CardView) => {
    setView(v);
    localStorage.setItem("cardView", v);
  };

  return { view, change, mounted };
}

export default function ViewToggle({
  view,
  onChange,
}: {
  view: CardView;
  onChange: (v: CardView) => void;
}) {
  return (
    <div
      className="inline-flex rounded-lg p-0.5 gap-0.5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <button
        onClick={() => onChange("visual")}
        className="px-3 py-1 rounded-md text-[11px] font-medium transition-all"
        style={
          view === "visual"
            ? { background: "var(--accent)", color: "#fff" }
            : { color: "var(--text-muted)" }
        }
      >
        Visual
      </button>
      <button
        onClick={() => onChange("classic")}
        className="px-3 py-1 rounded-md text-[11px] font-medium transition-all"
        style={
          view === "classic"
            ? { background: "var(--accent)", color: "#fff" }
            : { color: "var(--text-muted)" }
        }
      >
        Classic
      </button>
    </div>
  );
}
