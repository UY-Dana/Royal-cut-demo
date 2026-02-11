"use client";

import { useMemo } from "react";
import { loadBookings, loadCustomers } from "@/lib/storage";

export default function AdminOverviewPage() {
  const bookings = useMemo(() => loadBookings(), []);
  const customers = useMemo(() => loadCustomers(), []);
  const today = new Date().toISOString().slice(0, 10);
  const todayList = bookings.filter((b) => b.date === today);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card"><p className="text-sm text-zinc-400">Total Bookings</p><p className="text-2xl font-bold">{bookings.length}</p></div>
        <div className="card"><p className="text-sm text-zinc-400">Customers</p><p className="text-2xl font-bold">{customers.length}</p></div>
        <div className="card"><p className="text-sm text-zinc-400">Today</p><p className="text-2xl font-bold">{todayList.length}</p></div>
      </div>
      <div className="card">
        <h2 className="mb-3 font-semibold">Today's Schedule</h2>
        <div className="space-y-2 text-sm">
          {todayList.length === 0 && <p className="text-zinc-500">No appointments today.</p>}
          {todayList.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded border border-zinc-800 p-2">
              <span>{b.time} - {b.customerName}</span>
              <span className="text-zinc-400">{b.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
