"use client";

import { useMemo, useState } from "react";
import { inspirationCatalog, type InspirationItem } from "@/lib/mock";

const categories = ["All", "Fade", "Beard", "Classic", "Modern"] as const;

export default function AdminCatalogPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<InspirationItem | null>(null);
  const list = useMemo(() => (cat === "All" ? inspirationCatalog : inspirationCatalog.filter((i) => i.category === cat)), [cat]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="page-title">Style Inspiration Catalog</h1>
        <p className="page-subtitle">Browse references by category for quick consultations.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button className={cat === c ? "btn-primary" : "btn-secondary"} key={c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <button key={item.id} className="card card-interactive overflow-hidden p-0 text-left" onClick={() => setActive(item)}>
            <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
            <div className="space-y-1 p-3.5">
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-zinc-400">{item.category}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="modal-backdrop">
          <div className="modal-panel max-w-lg">
            <img src={active.image} alt={active.title} className="mb-3 h-56 w-full rounded-lg object-cover" />
            <h3 className="text-lg font-bold">{active.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{active.description}</p>
            <button className="btn-secondary mt-4 w-full" onClick={() => setActive(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
