# SqueezeDaily

**Short Squeeze + Daily/Weekly Trading Plan Dashboard**  
สำหรับหุ้น ASTS · RKLB · LITE · CRWV

รองรับภาษาไทย + English

---

## Features
- Real-time ราคาหุ้น จาก **Finnhub**
- Short Interest + Days to Cover (อัปเดต manual)
- Daily / Weekly Trading Plan
- เน้นโอกาส Short Squeeze

---

## Quick Start (Local)

1. Clone repo
```bash
git clone https://github.com/YOUR_USERNAME/squeezedaily.git
cd squeezedaily
```

2. ติดตั้ง dependencies
```bash
npm install
```

3. สร้างไฟล์ `.env.local`
```bash
cp .env.example .env.local
```

4. ใส่ Finnhub API Key (สมัครฟรีที่ https://finnhub.io)
```
FINNHUB_API_KEY=your_key_here
```

5. รัน
```bash
npm run dev
```

เปิด http://localhost:3000

---

## Deploy บน Railway (แนะนำ)

1. Push โค้ดขึ้น GitHub
2. ไปที่ [railway.app](https://railway.app) → New Project → Deploy from GitHub repo
3. เลือก repo นี้
4. ไปที่ Variables แล้วเพิ่ม:
   ```
   FINNHUB_API_KEY=your_key_here
   ```
5. Deploy → Generate Domain

Railway จะ detect Next.js อัตโนมัติ (ใช้ `output: "standalone"`)

---

## โครงสร้างโปรเจกต์

```
src/
  app/
    page.tsx          → หน้าหลัก Dashboard
    api/quote/        → Proxy ไป Finnhub
    layout.tsx
    globals.css
  components/
    StockCard.tsx     → การ์ดหุ้นแต่ละตัว
  lib/
    stocks.ts         → ข้อมูลหุ้น + แผนรายวัน
```

---

## อัปเดต Short Interest

แก้ไฟล์ `src/lib/stocks.ts` แล้ว push ใหม่

---

## Disclaimer
แอปนี้สร้างเพื่อการศึกษาและติดตามแผนเทรดเท่านั้น  
ไม่ใช่คำแนะนำการลงทุน

---

Made for short-term catalyst + squeeze trading (1-7 days)
