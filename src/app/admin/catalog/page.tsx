"use client";

import { useMemo, useState } from "react";
import { inspirationCatalog, type InspirationItem } from "@/lib/mock";

const categories = ["All", "Fade", "Beard", "Classic", "Modern"] as const;

export default function AdminCatalogPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<InspirationItem | null>(null);
  const list = useMemo(() => (cat === "All" ? inspirationCatalog : inspirationCatalog.filter((i) => i.category === cat)), [cat]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Style Inspiration Catalog</h1>
      <div className="flex flex-wrap gap-2">{categories.map((c) => <button className={cat === c ? "btn-primary" : "btn-secondary"} key={c} onClick={() => setCat(c)}>{c}</button>)}</div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <button key={item.id} className="card overflow-hidden p-0 text-left" onClick={() => setActive(item)}>
            <img src={item.image} alt={item.title} className="h-36 w-full object-cover" />
            <div className="p-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-zinc-400">{item.category}</p></div>
          </button>
        ))}
      </div>
      {active && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"><div className="max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 p-4"><img src={active.image} alt={active.title} className="mb-3 h-56 w-full rounded object-cover" /><h3 className="font-bold">{active.title}</h3><p className="text-sm text-zinc-400">{active.description}</p><button className="btn-primary mt-4 w-full" onClick={() => setActive(null)}>Close</button></div></div>}
    </div>
  );
}
