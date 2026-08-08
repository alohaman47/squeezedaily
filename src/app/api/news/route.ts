import { NextRequest, NextResponse } from "next/server";

const FINNHUB = "https://finnhub.io/api/v1";

async function translateToThai(text: string): Promise<string> {
  if (!text || text.length < 3) return text;
  try {
    // MyMemory free translation API (no key required for low volume)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text.slice(0, 500)
    )}&langpair=en|th`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") || "ASTS";
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return NextResponse.json(
      {
        error:
          "FINNHUB_API_KEY is not set on the server. Please add it in Railway Variables.",
        news: [],
      },
      { status: 200 }
    );
  }

  // Last 14 days
  const to = new Date().toISOString().slice(0, 10);
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 14);
  const from = fromDate.toISOString().slice(0, 10);

  try {
    const res = await fetch(
      `${FINNHUB}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${key}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Finnhub error: ${res.status}`, news: [] },
        { status: 200 }
      );
    }

    const data = await res.json();
    const rawNews = Array.isArray(data) ? data.slice(0, 8) : [];

    // Translate headlines + summaries to Thai (sequentially to avoid rate limits)
    const news = [];
    for (const n of rawNews) {
      const [headlineTh, summaryTh] = await Promise.all([
        translateToThai(n.headline || ""),
        translateToThai(n.summary || ""),
      ]);

      news.push({
        id: n.id,
        headline: n.headline,
        headlineTh,
        summary: n.summary,
        summaryTh,
        source: n.source,
        url: n.url,
        datetime: n.datetime,
        image: n.image,
      });
    }

    return NextResponse.json({ symbol, news, from, to });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch news", news: [] },
      { status: 200 }
    );
  }
}
