export type Signal = "Buy" | "Hold" | "Sell";

export type TradePlan = {
  preEarningsTh: string;
  preEarnings: string;
  postEarningsTh: string;
  postEarnings: string;
  stopTh: string;
  stop: string;
  takeProfitTh: string;
  takeProfit: string;
  notesTh: string;
  notes: string;
};

export type Stock = {
  symbol: string;
  name: string;
  nameTh: string;
  shortInterest: number;
  daysToCover: number;
  earningsDate: string;
  earningsTime: "BMO" | "AMC" | "Unknown";
  theme: string;
  themeTh: string;
  priority: number;
  signal: Signal;
  signalReason: string;
  signalReasonTh: string;
  notes: string;
  notesTh: string;
  riskLevel: "Low" | "Medium" | "High";
  positionSize: string;
  positionSizeTh: string;
  impliedMove: string;
  impliedMoveTh: string;
  plan: TradePlan;
};

export const STOCKS: Stock[] = [
  {
    symbol: "ASTS",
    name: "AST SpaceMobile",
    nameTh: "AST SpaceMobile",
    shortInterest: 20.5,
    daysToCover: 3.8,
    earningsDate: "2026-08-10",
    earningsTime: "AMC",
    theme: "Space / Satellite",
    themeTh: "อวกาศ / ดาวเทียม",
    priority: 1,
    signal: "Buy",
    signalReason: "Highest squeeze potential. Enter before or on strong post-earnings reaction.",
    signalReasonTh: "โอกาส Squeeze สูงสุด เข้าก่อนหรือหลัง earnings ถ้ามีแรงซื้อชัด",
    notes: "Highest squeeze potential. High short interest + earnings Monday.",
    notesTh: "โอกาส Squeeze สูงสุด Short สูง + Earnings จันทร์",
    riskLevel: "High",
    positionSize: "1-2% of capital",
    positionSizeTh: "1-2% ของทุน",
    impliedMove: "~18-25%",
    impliedMoveTh: "ประมาณ 18-25%",
    plan: {
      preEarningsTh:
        "ถ้าทน gap ได้: สะสมเล็กน้อยระหว่างวันจันทร์ ไม่เกิน 50% ของ size ที่ตั้งไว้ ก่อนปิดตลาด",
      preEarnings:
        "If you accept gap risk: scale in lightly Monday session, max 50% of planned size before close.",
      postEarningsTh:
        "รอเปิดอังคาร ถ้า gap ขึ้น + volume สูง (RVOL > 1.5x) ค่อยเพิ่มอีก 50% | ถ้า gap ลงแรง ให้รอย่อแล้วดูว่ามีแรงซื้อคืนหรือไม่ ก่อนตัดสินใจ",
      postEarnings:
        "Wait for Tuesday open. Add only if gap-up + strong volume (RVOL > 1.5x). If hard gap-down, wait for reclaim before considering entry.",
      stopTh:
        "ตัดขาดทุนถ้าราคาปิดต่ำกว่าราคาเข้า ~8–10% หรือต่ำกว่า low วันก่อน earnings อย่างชัดเจน",
      stop: "Cut if price closes ~8–10% below entry or decisively under pre-earnings day low.",
      takeProfitTh:
        "ขาย 1/3 ที่ +10–12% | อีก 1/3 ที่ +18–20% | ที่เหลือปล่อยตามแรง squeeze แต่Trailing ถ้า volume เริ่มเบา",
      takeProfit:
        "Scale: 1/3 at +10–12%, 1/3 at +18–20%, runner with trail if volume fades.",
      notesTh: "ตัวหลักของสัปดาห์ — โฟกัส confirmation หลัง earnings มากกว่ารีบเข้าก่อน",
      notes: "Primary name this week — prefer post-earnings confirmation over aggressive pre-load.",
    },
  },
  {
    symbol: "RKLB",
    name: "Rocket Lab",
    nameTh: "Rocket Lab",
    shortInterest: 8.5,
    daysToCover: 2.4,
    earningsDate: "2026-08-10",
    earningsTime: "AMC",
    theme: "Space / Launch",
    themeTh: "อวกาศ / จรวด",
    priority: 2,
    signal: "Buy",
    signalReason: "Strong space momentum + earnings catalyst. Good risk/reward.",
    signalReasonTh: "โมเมนตัม Space แรง + มี catalyst จาก earnings",
    notes: "Strong space momentum + earnings. Good catalyst play.",
    notesTh: "โมเมนตัม Space แรง + Earnings ดี",
    riskLevel: "Medium",
    positionSize: "2-3% of capital",
    positionSizeTh: "2-3% ของทุน",
    impliedMove: "~12-18%",
    impliedMoveTh: "ประมาณ 12-18%",
    plan: {
      preEarningsTh:
        "เข้าได้เล็กน้อยวันจันทร์ถ้าโมเมนตัม Space ยังดี ไม่ควรเต็ม size ก่อนข่าว",
      preEarnings: "Light pre-earnings add only if space tape is strong. Do not go full size before the print.",
      postEarningsTh:
        "ถ้า earnings ดี + เปิดขึ้น ให้เข้า/เพิ่มตามแรง volume | ถ้าเปิดลง ให้รอ reclaim ระดับก่อน earnings",
      postEarnings:
        "If strong report + gap-up, enter/add on volume. If gap-down, wait for reclaim of pre-earnings level.",
      stopTh: "ตัดที่ประมาณ -6 ถึง -8% จากจุดเข้า หรือต่ำกว่า low วัน reaction",
      stop: "Stop around -6% to -8% from entry or under reaction-day low.",
      takeProfitTh: "ขายบางส่วนที่ +8–10% และ +14–16% ที่เหลือ trailing",
      takeProfit: "Partial at +8–10% and +14–16%, trail the rest.",
      notesTh: "เล่น momentum + catalyst มากกว่า pure squeeze",
      notes: "More momentum/catalyst than pure squeeze.",
    },
  },
  {
    symbol: "LITE",
    name: "Lumentum",
    nameTh: "Lumentum",
    shortInterest: 11.3,
    daysToCover: 2.2,
    earningsDate: "2026-08-11",
    earningsTime: "AMC",
    theme: "AI Optics",
    themeTh: "AI Optics / Photonics",
    priority: 3,
    signal: "Hold",
    signalReason: "Wait for earnings reaction. Buy only on strong breakout with volume.",
    signalReasonTh: "รอ reaction จาก earnings ก่อน ซื้อเฉพาะถ้าทะลุแรงพร้อม volume",
    notes: "AI optics play with strong recent momentum.",
    notesTh: "เล่นธีม AI Optics โมเมนตัมดี",
    riskLevel: "Medium",
    positionSize: "1-2% of capital",
    positionSizeTh: "1-2% ของทุน",
    impliedMove: "~10-15%",
    impliedMoveTh: "ประมาณ 10-15%",
    plan: {
      preEarningsTh: "ไม่แนะนำเข้าหนักก่อน earnings — รอผลก่อน",
      preEarnings: "Avoid heavy pre-earnings exposure — wait for the print.",
      postEarningsTh:
        "เข้าได้ถ้าเปิดขึ้นแรง + volume ยืนยัน และราคาไม่ถูกทุบกลับทันที",
      postEarnings:
        "Enter only on strong gap-up with sustained volume and no instant rejection.",
      stopTh: "ตัดที่ -5 ถึง -7% จากจุดเข้า",
      stop: "Stop roughly -5% to -7% from entry.",
      takeProfitTh: "เป้าแรก +8–10% เป้าสอง +13–15%",
      takeProfit: "First target +8–10%, second +13–15%.",
      notesTh: "เป็น HOLD จนกว่า reaction จะชัด",
      notes: "Stay HOLD until reaction is clear.",
    },
  },
  {
    symbol: "CRWV",
    name: "CoreWeave",
    nameTh: "CoreWeave",
    shortInterest: 19.5,
    daysToCover: 2.5,
    earningsDate: "2026-08-11",
    earningsTime: "AMC",
    theme: "AI Cloud",
    themeTh: "AI Cloud Infrastructure",
    priority: 4,
    signal: "Hold",
    signalReason: "High short interest but very volatile. Wait for clear post-earnings direction.",
    signalReasonTh: "Short สูงแต่ผันผวนมาก รอทิศทางชัดหลัง earnings ก่อน",
    notes: "High short + AI cloud. Volatile but high potential.",
    notesTh: "Short สูง + AI Cloud ความผันผวนสูง",
    riskLevel: "High",
    positionSize: "0.5-1.5% of capital",
    positionSizeTh: "0.5-1.5% ของทุน",
    impliedMove: "~15-22%",
    impliedMoveTh: "ประมาณ 15-22%",
    plan: {
      preEarningsTh: "ไม่เข้าก่อนข่าว — ผันผวนสูงเกินไป",
      preEarnings: "No pre-earnings entry — too volatile.",
      postEarningsTh:
        "รอทิศทางชัดหลังเปิด อังคาร/พุธ ถ้าขึ้นพร้อม volume ค่อยเข้า size เล็ก",
      postEarnings:
        "Wait for clear direction after the open. Only small size if upside holds with volume.",
      stopTh: "ตัดเร็วที่ประมาณ -7 ถึง -9%",
      stop: "Tight-ish stop around -7% to -9%.",
      takeProfitTh: "ขายเร็วเป็นส่วนๆ ที่ +10% และ +16%+",
      takeProfit: "Scale quickly at +10% and +16%+.",
      notesTh: "SI สูงแต่ต้องมี confirmation เท่านั้น",
      notes: "High SI only works with confirmation.",
    },
  },
  {
    symbol: "SMCI",
    name: "Super Micro Computer",
    nameTh: "Super Micro Computer",
    shortInterest: 14.2,
    daysToCover: 1.8,
    earningsDate: "2026-08-11",
    earningsTime: "AMC",
    theme: "AI Server",
    themeTh: "AI Server / Hardware",
    priority: 5,
    signal: "Hold",
    signalReason: "AI server name with earnings. Watch reaction carefully, high volatility.",
    signalReasonTh: "หุ้น AI Server มี earnings ระวังความผันผวน ดู reaction ก่อน",
    notes: "AI infrastructure hardware. Earnings Tuesday.",
    notesTh: "ฮาร์ดแวร์ AI มี earnings วันอังคาร",
    riskLevel: "High",
    positionSize: "1% of capital",
    positionSizeTh: "1% ของทุน",
    impliedMove: "~12-20%",
    impliedMoveTh: "ประมาณ 12-20%",
    plan: {
      preEarningsTh: "ไม่แนะนำเข้าก่อน earnings",
      preEarnings: "Avoid pre-earnings entry.",
      postEarningsTh: "เข้าเฉพาะถ้า reaction ขึ้นชัดและถือระดับได้ในช่วงแรกหลังเปิด",
      postEarnings: "Only if upside reaction holds in the first part of the session.",
      stopTh: "ตัดที่ประมาณ -6 ถึง -8%",
      stop: "Stop around -6% to -8%.",
      takeProfitTh: "เป้า +9–12% และ +15%+",
      takeProfit: "Targets +9–12% and +15%+.",
      notesTh: "Size เล็กเสมอ เพราะเหวี่ยงแรง",
      notes: "Keep size small due to swings.",
    },
  },
  {
    symbol: "COHR",
    name: "Coherent",
    nameTh: "Coherent",
    shortInterest: 9.8,
    daysToCover: 2.1,
    earningsDate: "2026-08-12",
    earningsTime: "AMC",
    theme: "AI Photonics",
    themeTh: "AI Photonics / Optics",
    priority: 6,
    signal: "Hold",
    signalReason: "Optics / photonics name. Better to wait for CPI + earnings reaction.",
    signalReasonTh: "กลุ่ม Optics รอ CPI และ earnings reaction ก่อนตัดสินใจ",
    notes: "Related to AI optics theme. Earnings around CPI day.",
    notesTh: "เกี่ยวข้องธีม AI Optics รายงานใกล้วัน CPI",
    riskLevel: "Medium",
    positionSize: "1-2% of capital",
    positionSizeTh: "1-2% ของทุน",
    impliedMove: "~9-14%",
    impliedMoveTh: "ประมาณ 9-14%",
    plan: {
      preEarningsTh: "รอผ่าน CPI วันพุธก่อน แล้วค่อยดู earnings",
      preEarnings: "Wait for Wednesday CPI first, then earnings reaction.",
      postEarningsTh: "เข้าได้ถ้าทั้ง CPI และ earnings ไม่กดตลาด และหุ้นมีแรงซื้อ",
      postEarnings: "Enter only if CPI + earnings do not pressure the tape and buyers show up.",
      stopTh: "ตัดที่ประมาณ -5 ถึง -7%",
      stop: "Stop around -5% to -7%.",
      takeProfitTh: "เป้า +7–10% และ +12–14%",
      takeProfit: "Targets +7–10% and +12–14%.",
      notesTh: "เป็นตัวรอง หลัง ASTS/RKLB",
      notes: "Secondary name after ASTS/RKLB.",
    },
  },
];

export const WEEKLY_PLAN = {
  theme: "Space + AI Infrastructure + CPI",
  themeTh: "Space + AI Infrastructure + CPI",
  days: [
    {
      day: "Monday 10 Aug",
      dayTh: "จันทร์ 10 ส.ค.",
      focus: ["ASTS", "RKLB"],
      note: "Both report after close (AMC). ASTS highest squeeze priority.",
      noteTh: "ทั้งคู่รายงานหลังปิด (AMC) ASTS สำคัญสุดเรื่อง Squeeze",
    },
    {
      day: "Tuesday 11 Aug",
      dayTh: "อังคาร 11 ส.ค.",
      focus: ["LITE", "CRWV", "SMCI"],
      note: "Watch Monday reaction. Multiple AI + optics names report AMC.",
      noteTh: "ดู reaction จากจันทร์ มีหลายตัวในกลุ่ม AI รายงาน AMC",
    },
    {
      day: "Wednesday 12 Aug",
      dayTh: "พุธ 12 ส.ค.",
      focus: ["CPI", "COHR"],
      note: "CPI day – wait for the number before new positions.",
      noteTh: "วัน CPI รอตัวเลขก่อนเปิด position ใหม่",
    },
    {
      day: "Thu–Fri",
      dayTh: "พฤหัส–ศุกร์",
      focus: ["Follow-through"],
      note: "Watch which names continue or reverse after earnings/CPI.",
      noteTh: "ดูตัวที่ยังมีแรงหรือถูกขายหลัง earnings/CPI",
    },
  ],
};

export const RISK_RULES = {
  title: "Risk Rules · กรอบความเสี่ยง",
  titleTh: "กรอบความเสี่ยงที่แนะนำ",
  rules: [
    {
      en: "Never risk more than 1% of total capital on a single trade.",
      th: "อย่าเสี่ยงเกิน 1% ของทุนทั้งหมดในหนึ่งออเดอร์",
    },
    {
      en: "High short interest + earnings = higher gap risk. Use smaller size.",
      th: "Short สูง + มี earnings = เสี่ยง gap สูง ใช้ size เล็กลง",
    },
    {
      en: "Prefer entering after confirmation (volume + direction) rather than guessing the earnings number.",
      th: "ควรเข้าหลังมี confirmation (volume + ทิศทาง) ดีกว่าเดาตัวเลข earnings",
    },
    {
      en: "Scale out on strength. Do not wait for the exact top.",
      th: "ขายทำกำไรเป็นส่วนๆ เมื่อราคาวิ่งแรง อย่ารอจุดสูงสุด",
    },
    {
      en: "If CPI comes out hot, reduce or avoid new positions in high-beta names.",
      th: "ถ้า CPI ออกมาแรง ให้ลดหรือเลี่ยงเปิด position ใหม่ในหุ้นผันผวนสูง",
    },
  ],
};

export const ENTRY_CHECKLIST = {
  titleTh: "Checklist ก่อนเข้าเทรด",
  title: "Entry Checklist",
  items: [
    {
      th: "มี Catalyst ชัดเจน (Earnings / ข่าวใหญ่)",
      en: "Clear catalyst (Earnings / major news)",
    },
    {
      th: "Relative Volume สูงกว่า 1.5 เท่า (มีแรงซื้อจริง)",
      en: "Relative Volume > 1.5x (real interest)",
    },
    {
      th: "ราคาเคลื่อนไหวตามทิศทางที่ต้องการหลังข่าว",
      en: "Price moves in the desired direction after the news",
    },
    {
      th: "ขนาด Position อยู่ในกรอบที่กำหนดไว้",
      en: "Position size within the planned risk limit",
    },
    {
      th: "รู้จุดตัดขาดทุนล่วงหน้า",
      en: "Know your stop-loss level in advance",
    },
  ],
};
