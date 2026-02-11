import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Royal Cut",
  description: "Royal Cut barbershop demo prototype",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans text-zinc-100`}>
        <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <Link href="/" className="group flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_22px_rgba(214,174,90,.75)]" />
              <span className="text-base font-semibold tracking-[0.28em] text-zinc-100 sm:text-lg">ROYAL CUT</span>
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2.5 text-sm">
              <Link href="/services" className="btn-ghost">Services</Link>
              <Link href="/book" className="btn-ghost">Book</Link>
              <Link href="/login" className="btn-secondary px-3 sm:px-4">Staff Login</Link>
            </div>
          </nav>
        </header>

        <Providers>
          <main className="main-surface mx-auto min-h-[calc(100vh-72px)] max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
