"use client";

import { useEffect, useState } from "react";
import { Stock, Signal } from "@/lib/stocks";

type Quote = {
  price?: number;
  change?: number;
  percent?: number;
  error?: string;
  mock?: boolean;
};

function SignalBadge({ signal }: { signal: Signal }) {
  const styles = {
    Buy: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    Hold: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    Sell: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  };

  const labels = {
    Buy: "BUY",
    Hold: "HOLD",
    Sell: "SELL",
  };

  return (
    <span
      className={`text-sm font-bold px-3 py-1 rounded-full border ${styles[signal]}`}
    >
      {labels[signal]}
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
  const squeezeScore =
    stock.shortInterest >= 18 ? "สูงมาก" : stock.shortInterest >= 12 ? "สูง" : "ปานกลาง";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg hover:border-slate-700 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">{stock.symbol}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
              #{stock.priority}
            </span>
          </div>
          <p className="text-sm text-slate-400">{stock.name}</p>
        </div>
        <div className="text-right">
          {loading ? (
            <div className="h-6 w-20 bg-slate-800 animate-pulse rounded" />
          ) : quote?.price ? (
            <>
              <p className="text-xl font-semibold">${quote.price.toFixed(2)}</p>
              <p className={`text-sm ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                {isUp ? "+" : ""}
                {quote.percent?.toFixed(2)}%
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">No data</p>
          )}
        </div>
      </div>

      {/* Signal */}
      <div className="mb-4 flex items-center gap-3">
        <SignalBadge signal={stock.signal} />
        <div className="text-sm">
          <p className="text-slate-200 font-medium">{stock.signalReasonTh}</p>
          <p className="text-xs text-slate-500">{stock.signalReason}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Short Interest</p>
          <p className="font-semibold text-amber-300">{stock.shortInterest}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Days to Cover</p>
          <p className="font-semibold">{stock.daysToCover}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Squeeze Score</p>
          <p className="font-semibold text-rose-300">{squeezeScore}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Earnings</p>
          <p className="font-semibold">{stock.earningsDate}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800">
        <p className="text-xs text-slate-400 mb-1">
          {stock.themeTh} · {stock.theme}
        </p>
        <p className="text-sm text-slate-300">{stock.notesTh}</p>
      </div>
    </div>
  );
}
