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
  datetime: number;
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
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Nav />

      <header className="mb-8">
        <p className="text-[12px] font-medium tracking-[0.12em] uppercase text-indigo-400/80 mb-2">
          Intelligence
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          News
        </h1>
        <p className="mt-1.5 text-[13px] text-slate-400">
          ข่าวบริษัท · แปลไทยอัตโนมัติ · อ่านในแอป
        </p>
      </header>

      {/* Symbol pills */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {STOCKS.map((s) => (
          <button
            key={s.symbol}
            onClick={() => setSelected(s.symbol)}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              selected === s.symbol
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                : "bg-white/[0.03] text-slate-400 border border-white/[0.05] hover:bg-white/[0.06] hover:text-slate-200"
            }`}
          >
            {s.symbol}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-white/[0.03] border border-white/[0.04] animate-pulse"
            />
          ))}
          <p className="text-[12px] text-slate-500 text-center pt-3">
            กำลังโหลดและแปลข่าว...
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-5">
          <p className="text-[13px] font-medium text-amber-200">ไม่สามารถโหลดข่าวได้</p>
          <p className="text-[12px] text-amber-200/60 mt-1">{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[13px] text-slate-500">ไม่พบข่าวล่าสุดของ {selected}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {news.map((item) => {
            const isOpen = expanded === item.id;
            const hasThai = item.headlineTh && item.headlineTh !== item.headline;

            return (
              <article
                key={item.id}
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className={`
                  rounded-2xl border p-5 cursor-pointer transition-all duration-200
                  ${
                    isOpen
                      ? "border-indigo-500/25 bg-indigo-500/[0.04]"
                      : "border-white/[0.05] bg-white/[0.02] hover:border-white/[0.09] hover:bg-white/[0.03]"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2 text-[11px]">
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 font-medium">
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

                <h2 className="text-[15px] font-medium text-white leading-snug tracking-tight">
                  {item.headlineTh || item.headline}
                </h2>

                {hasThai && (
                  <p className="text-[12px] text-slate-500 mt-1.5 leading-snug">
                    {item.headline}
                  </p>
                )}

                {(item.summaryTh || item.summary) && (
                  <p
                    className={`text-[13px] text-slate-400 mt-3 leading-relaxed ${
                      isOpen ? "" : "line-clamp-2"
                    }`}
                  >
                    {item.summaryTh || item.summary}
                  </p>
                )}

                <div className="mt-3 flex justify-end">
                  <span
                    className={`text-[11px] font-medium ${
                      isOpen ? "text-indigo-400" : "text-slate-600"
                    }`}
                  >
                    {isOpen ? "ย่อ" : "อ่านเพิ่ม"}
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
