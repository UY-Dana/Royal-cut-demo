"use client";

import { useState } from "react";
import { appendCustomerPhoto, loadCustomers, saveCustomers } from "@/lib/storage";
import { type Customer } from "@/lib/mock";
import { useToast } from "@/components/toast";

export default function AdminCustomersPage() {
  const { show } = useToast();
  const [list, setList] = useState(loadCustomers());
  const [active, setActive] = useState<Customer | null>(null);

  const saveNotes = (customer: Customer, notes: string) => {
    const updated = list.map((c) => (c.id === customer.id ? { ...c, notes } : c));
    saveCustomers(updated);
    setList(updated);
    setActive(updated.find((c) => c.id === customer.id) ?? null);
    show("Customer notes updated");
  };

  const onUpload = (customer: Customer, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result ?? "");
      const updated = appendCustomerPhoto(customer.id, base64);
      setList(updated);
      setActive(updated.find((c) => c.id === customer.id) ?? null);
      show("Style photo saved");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="page-title">Customers</h1>
        <p className="page-subtitle">View profiles, update notes, and save style references.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((c) => (
          <button key={c.id} className="card card-interactive text-left" onClick={() => setActive(c)}>
            <p className="font-semibold">{c.name}</p>
            <p className="mt-1 text-sm text-zinc-400">{c.phone}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">Visits: {c.visits}</p>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-zinc-700 bg-zinc-950 p-4 sm:p-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{active.name}</h2>
              <p className="text-sm text-zinc-400">{active.phone}</p>
            </div>

            <label className="label mt-4">Notes</label>
            <textarea className="input min-h-28" defaultValue={active.notes} onBlur={(e) => saveNotes(active, e.target.value)} />

            <label className="label mt-4">Upload style photo</label>
            <input className="input" type="file" accept="image/*" onChange={(e) => onUpload(active, e.target.files?.[0])} />

            <div className="mt-4 grid grid-cols-2 gap-2">
              {(active.photos ?? []).map((p, i) => (
                <img key={i} src={p} alt="style" className="h-24 w-full rounded-lg border border-zinc-700 object-cover" />
              ))}
            </div>

            <button className="btn-secondary mt-5 w-full" onClick={() => setActive(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
