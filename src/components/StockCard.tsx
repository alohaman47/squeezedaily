"use client";

import { useEffect, useState } from "react";
import { Stock, Signal } from "@/lib/stocks";

type Quote = {
  price?: number;
  change?: number;
  percent?: number;
  volume?: number | null;
  avgVolume?: number | null;
  relativeVolume?: number | null;
};

function SignalBadge({ signal }: { signal: Signal }) {
  if (signal === "Buy") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
        style={{
          background: "rgba(52, 211, 153, 0.1)",
          color: "var(--positive)",
          border: "1px solid rgba(52, 211, 153, 0.2)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--positive)" }} />
        Buy
      </span>
    );
  }
  if (signal === "Sell") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
        style={{
          background: "rgba(248, 113, 113, 0.1)",
          color: "var(--negative)",
          border: "1px solid rgba(248, 113, 113, 0.2)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--negative)" }} />
        Sell
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
      style={{
        background: "rgba(251, 191, 36, 0.1)",
        color: "var(--warning)",
        border: "1px solid rgba(251, 191, 36, 0.2)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--warning)" }} />
      Hold
    </span>
  );
}

export default function StockCard({ stock }: { stock: Stock }) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/quote?symbol=${stock.symbol}`)
      .then((r) => r.json())
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [stock.symbol]);

  const isUp = (quote?.percent ?? 0) >= 0;
  const rvol = quote?.relativeVolume;
  const squeezeLabel =
    stock.shortInterest >= 18 ? "สูงมาก" : stock.shortInterest >= 12 ? "สูง" : "ปานกลาง";

  return (
    <article className="card-premium p-5 flex flex-col h-full">
      {/* Top */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-semibold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>
              {stock.symbol}
            </h3>
            <span className="text-[10px] font-medium tabular-nums" style={{ color: "var(--text-muted)" }}>
              #{stock.priority}
            </span>
          </div>
          <p className="text-[12px] truncate" style={{ color: "var(--text-muted)" }}>
            {stock.name}
          </p>
        </div>

        <div className="text-right shrink-0">
          {loading ? (
            <div className="h-5 w-16 animate-pulse rounded" style={{ background: "var(--surface)" }} />
          ) : quote?.price ? (
            <>
              <p className="text-[17px] font-semibold tabular-nums tracking-tight" style={{ color: "var(--text-primary)" }}>
                ${quote.price.toFixed(2)}
              </p>
              <p
                className="text-[12px] font-medium tabular-nums"
                style={{ color: isUp ? "var(--positive)" : "var(--negative)" }}
              >
                {isUp ? "+" : ""}
                {quote.percent?.toFixed(2)}%
              </p>
            </>
          ) : (
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>—</p>
          )}
        </div>
      </div>

      <div className="mb-3">
        <SignalBadge signal={stock.signal} />
      </div>

      <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
        {stock.signalReasonTh}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Short %", value: `${stock.shortInterest}%`, color: "var(--warning)" },
          { label: "Squeeze", value: squeezeLabel, color: "var(--negative)" },
          {
            label: "RVOL",
            value: rvol ? `${rvol.toFixed(1)}x` : "—",
            color: rvol && rvol >= 2 ? "var(--positive)" : rvol && rvol >= 1.5 ? "var(--warning)" : "var(--text-primary)",
          },
          {
            label: "Earnings",
            value: `${stock.earningsDate.slice(5)} ${stock.earningsTime}`,
            color: "var(--text-primary)",
          },
          { label: "Imp. Move", value: stock.impliedMove, color: "var(--accent)" },
          {
            label: "Risk",
            value: stock.riskLevel,
            color:
              stock.riskLevel === "High"
                ? "var(--negative)"
                : stock.riskLevel === "Medium"
                ? "var(--warning)"
                : "var(--positive)",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg px-2.5 py-2"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>
              {m.label}
            </p>
            <p className="text-[12px] font-semibold tabular-nums" style={{ color: m.color }}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Position */}
      <div className="mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Position Size
          </span>
          <span className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
            {stock.positionSizeTh}
          </span>
        </div>
      </div>
    </article>
  );
}
