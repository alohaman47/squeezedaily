import { NextRequest, NextResponse } from "next/server";

const FINNHUB = "https://finnhub.io/api/v1";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") || "ASTS";
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return NextResponse.json(
      { 
        error: "FINNHUB_API_KEY is not set on the server. Please add it in Railway Variables.", 
        news: [] 
      }, 
      { status: 200 }
    );
  }

  // Last 14 days for better coverage
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
        { error: `Finnhub error: ${res.status} - ${text}`, news: [] },
        { status: 200 }
      );
    }

    const data = await res.json();

    const news = Array.isArray(data)
      ? data.slice(0, 12).map((n: any) => ({
          id: n.id,
          headline: n.headline,
          summary: n.summary,
          source: n.source,
          url: n.url,
          datetime: n.datetime,
          image: n.image,
        }))
      : [];

    return NextResponse.json({ symbol, news, from, to });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch news", news: [] },
      { status: 200 }
    );
  }
}
