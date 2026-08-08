"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { STOCKS } from "@/lib/stocks";

type NewsItem = {
  id: number;
  headline: string;
  headlineTh?: string;
  summary: string;
  summaryTh?: string;
  source: string;
  url: string;
  datetime: number;
  image?: string;
};

export default function NewsPage() {
  const [selected, setSelected] = useState("ASTS");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setExpanded(null);
    fetch(`/api/news?symbol=${selected}`)
      .then((r) => r.json())
      .then((data) => {
        setNews(data.news || []);
        if (data.error) setError(data.error);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Network error");
        setLoading(false);
      });
  }, [selected]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Nav />

      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          News · ข่าวล่าสุด
        </h1>
        <p className="text-slate-400 mt-1 text-sm">
          แปลไทยอัตโนมัติ · อ่านสรุปในแอป
        </p>
      </header>

      {/* Symbol selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STOCKS.map((s) => (
          <button
            key={s.symbol}
            onClick={() => setSelected(s.symbol)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${
              selected === s.symbol
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {s.symbol}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-slate-800/40 animate-pulse rounded-2xl"
            />
          ))}
          <p className="text-sm text-slate-500 text-center pt-2">
            กำลังโหลดและแปลข่าว...
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-amber-200">
          <p className="font-medium">ไม่สามารถโหลดข่าวได้</p>
          <p className="text-sm mt-2 text-amber-300/70">{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p>ไม่พบข่าวล่าสุดของ {selected}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => {
            const isOpen = expanded === item.id;
            const hasThai =
              item.headlineTh && item.headlineTh !== item.headline;

            return (
              <article
                key={item.id}
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className={`
                  group rounded-2xl border p-5 cursor-pointer transition-all duration-200
                  ${
                    isOpen
                      ? "border-indigo-500/40 bg-slate-900 shadow-lg shadow-indigo-950/20"
                      : "border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
                  }
                `}
              >
                {/* Meta row */}
                <div className="flex items-center gap-2 mb-2.5 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium">
                    {item.source}
                  </span>
                  <span className="text-slate-600">·</span>
                  <time className="text-slate-500">
                    {new Date(item.datetime * 1000).toLocaleString("th-TH", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                {/* Headline Thai */}
                <h2 className="text-[17px] font-semibold text-white leading-snug tracking-tight">
                  {item.headlineTh || item.headline}
                </h2>

                {/* Headline English (smaller) */}
                {hasThai && (
                  <p className="text-[13px] text-slate-500 mt-1.5 leading-snug">
                    {item.headline}
                  </p>
                )}

                {/* Summary */}
                {(item.summaryTh || item.summary) && (
                  <div
                    className={`
                      mt-3 text-[14px] text-slate-300 leading-relaxed
                      ${isOpen ? "" : "line-clamp-2"}
                    `}
                  >
                    {item.summaryTh || item.summary}
                  </div>
                )}

                {/* Expand hint */}
                <div className="mt-3 flex justify-end">
                  <span
                    className={`
                      text-xs font-medium transition
                      ${isOpen ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-400"}
                    `}
                  >
                    {isOpen ? "ย่อ ▲" : "อ่านเพิ่ม ▼"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
