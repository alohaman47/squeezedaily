"use client";

import { STOCKS } from "@/lib/stocks";
import StockCard from "./StockCard";
import ViewToggle, { useCardView } from "./ViewToggle";

export default function WatchlistSection() {
  const { view, change, mounted } = useCardView();

  return (
    <section className="mb-14">
      <div className="flex items-end justify-between mb-5 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <h2
            className="text-[15px] font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Watchlist
          </h2>
          <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
            {STOCKS.length} names
          </span>
        </div>
        {mounted && <ViewToggle view={view} onChange={change} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STOCKS.map((s) => (
          <StockCard key={s.symbol} stock={s} view={view} />
        ))}
      </div>
    </section>
  );
}
