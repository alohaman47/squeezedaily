import { NextRequest, NextResponse } from "next/server";

const FINNHUB = "https://finnhub.io/api/v1";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol") || "ASTS";
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "API key missing", news: [] }, { status: 200 });
  }

  // Last 7 days
  const to = new Date().toISOString().slice(0, 10);
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  const from = fromDate.toISOString().slice(0, 10);

  try {
    const res = await fetch(
      `${FINNHUB}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${key}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();

    // Limit to 8 most recent
    const news = Array.isArray(data)
      ? data.slice(0, 8).map((n: any) => ({
          id: n.id,
          headline: n.headline,
          summary: n.summary,
          source: n.source,
          url: n.url,
          datetime: n.datetime,
          image: n.image,
        }))
      : [];

    return NextResponse.json({ symbol, news });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch news", news: [] }, { status: 500 });
  }
}
