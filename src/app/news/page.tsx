"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { STOCKS } from "@/lib/stocks";

type NewsItem = {
  id: number;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: number;
  image?: string;
};

export default function NewsPage() {
  const [selected, setSelected] = useState("ASTS");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?symbol=${selected}`)
      .then((r) => r.json())
      .then((data) => {
        setNews(data.news || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selected]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Nav />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">News · ข่าวล่าสุด</h1>
        <p className="text-slate-400 mt-1">
          Company news from Finnhub (last 7 days)
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
            <div key={i} className="h-28 bg-slate-800/50 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : news.length === 0 ? (
        <p className="text-slate-500">No recent news found for {selected}</p>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-600 transition"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>
                      {new Date(item.datetime * 1000).toLocaleString("th-TH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
