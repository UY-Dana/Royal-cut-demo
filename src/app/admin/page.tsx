"use client";

import { useMemo } from "react";
import { loadBookings, loadCustomers } from "@/lib/storage";

export default function AdminOverviewPage() {
  const bookings = useMemo(() => loadBookings(), []);
  const customers = useMemo(() => loadCustomers(), []);
  const today = new Date().toISOString().slice(0, 10);
  const todayList = bookings.filter((b) => b.date === today);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <span className="chip">Dashboard</span>
        <h1 className="page-title">Overview</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Total Bookings</p>
          <p className="mt-2 text-3xl font-bold text-zinc-50">{bookings.length}</p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Customers</p>
          <p className="mt-2 text-3xl font-bold text-zinc-50">{customers.length}</p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Today</p>
          <p className="mt-2 text-3xl font-bold text-zinc-50">{todayList.length}</p>
        </div>
      </div>

      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Today&apos;s Schedule</h2>
        <div className="space-y-2 text-sm">
          {todayList.length === 0 && <p className="text-zinc-500">No appointments today.</p>}
          {todayList.map((b) => (
            <div key={b.id} className="surface-muted flex items-center justify-between gap-2 p-3">
              <span>{b.time} - {b.customerName}</span>
              <span className="chip">{b.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
