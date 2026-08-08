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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Nav />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">News · ข่าวล่าสุด</h1>
        <p className="text-slate-400 mt-1">
          ข่าวบริษัทจาก Finnhub (14 วันล่าสุด) · แปลไทยอัตโนมัติ
        </p>
        <p className="text-xs text-slate-500 mt-1">
          อ่านสรุปในแอปอย่างเดียว ไม่เปิดลิงก์ภายนอก
        </p>
      </header>

      {/* Symbol selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STOCKS.map((s) => (
          <button
            key={s.symbol}
            onClick={() => setSelected(s.symbol)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selected === s.symbol
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {s.symbol}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-800/50 animate-pulse rounded-xl" />
          ))}
          <p className="text-sm text-slate-500 text-center">กำลังแปลข่าวเป็นภาษาไทย...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 text-amber-200">
          <p className="font-medium">ไม่สามารถโหลดข่าวได้</p>
          <p className="text-sm mt-2 text-amber-300/80">{error}</p>
          <p className="text-xs mt-3 text-slate-400">
            ถ้ายังไม่ได้ใส่ API Key → ไปที่ Railway → Variables แล้วเพิ่ม<br />
            <code className="text-indigo-300">
              FINNHUB_API_KEY=d9rjncpr01qoo7o4kgu0d9rjncpr01qoo7o4kgug
            </code>
          </p>
        </div>
      ) : news.length === 0 ? (
        <p className="text-slate-500">ไม่พบข่าวล่าสุดของ {selected}</p>
      ) : (
        <div className="space-y-4">
          {news.map((item) => {
            const isOpen = expanded === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 cursor-pointer hover:border-slate-600 transition"
              >
                {/* Thai headline */}
                <h3 className="text-lg font-medium text-white leading-snug">
                  {item.headlineTh || item.headline}
                </h3>

                {/* English headline */}
                {item.headlineTh && item.headlineTh !== item.headline && (
                  <p className="text-sm text-slate-500 mt-1 leading-snug">
                    {item.headline}
                  </p>
                )}

                {/* Summary - show more when expanded */}
                {(item.summaryTh || item.summary) && (
                  <p
                    className={`text-sm text-slate-300 mt-3 ${
                      isOpen ? "" : "line-clamp-2"
                    }`}
                  >
                    {item.summaryTh || item.summary}
                  </p>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>
                      {new Date(item.datetime * 1000).toLocaleString("th-TH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-indigo-400">
                    {isOpen ? "ย่อ ▲" : "อ่านเพิ่ม ▼"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
