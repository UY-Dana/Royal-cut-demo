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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="grid gap-2 sm:grid-cols-2">
        {list.map((c) => (
          <button key={c.id} className="card text-left" onClick={() => setActive(c)}>
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-zinc-400">{c.phone} • Visits: {c.visits}</p>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60">
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-zinc-700 bg-zinc-900 p-4">
            <h2 className="text-xl font-bold">{active.name}</h2>
            <p className="text-sm text-zinc-400">{active.phone}</p>
            <label className="label mt-3">Notes</label>
            <textarea className="input min-h-24" defaultValue={active.notes} onBlur={(e) => saveNotes(active, e.target.value)} />
            <label className="label mt-3">Upload style photo</label>
            <input className="input" type="file" accept="image/*" onChange={(e) => onUpload(active, e.target.files?.[0])} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(active.photos ?? []).map((p, i) => <img key={i} src={p} alt="style" className="h-24 w-full rounded object-cover" />)}
            </div>
            <button className="btn-primary mt-4 w-full" onClick={() => setActive(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
