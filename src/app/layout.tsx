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
      <body className={`${inter.variable} bg-zinc-950 text-zinc-100 font-sans`}>
        <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold tracking-widest">ROYAL CUT</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/services" className="hover:text-amber-300">Services</Link>
              <Link href="/book" className="hover:text-amber-300">Book</Link>
              <Link href="/login" className="rounded-md border border-zinc-700 px-3 py-1.5 hover:border-amber-400">Staff Login</Link>
            </div>
          </nav>
        </header>
        <Providers>
          <main className="mx-auto min-h-[calc(100vh-65px)] max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
