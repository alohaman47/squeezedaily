import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SqueezeDaily · Short Squeeze Trading Desk",
  description: "Premium short-term trading desk for catalyst & squeeze opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen antialiased selection:bg-indigo-500/30">
        {/* subtle ambient glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
          <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px]" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
