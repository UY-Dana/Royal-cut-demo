"use client";

import { useMemo, useState } from "react";
import { loadBookings, updateBookingStatus } from "@/lib/storage";
import { barbers, services, type Booking, type BookingStatus } from "@/lib/mock";
import { useToast } from "@/components/toast";

const statuses: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminBookingsPage() {
  const { show } = useToast();
  const [list, setList] = useState(loadBookings());
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [active, setActive] = useState<Booking | null>(null);

  const filtered = useMemo(() => (statusFilter === "all" ? list : list.filter((b) => b.status === statusFilter)), [list, statusFilter]);

  const setStatus = (id: string, status: BookingStatus) => {
    setList(updateBookingStatus(id, status));
    show(`Booking marked ${status}`);
  };

  const getName = (id: string, type: "service" | "barber") => type === "service" ? services.find((x) => x.id === id)?.name : barbers.find((x) => x.id === id)?.name;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bookings</h1>
      <div className="flex flex-wrap gap-2">{["all", ...statuses].map((s) => <button key={s} onClick={() => setStatusFilter(s as BookingStatus | "all")} className={statusFilter === s ? "btn-primary" : "btn-secondary"}>{s}</button>)}</div>
      <div className="space-y-2">
        {filtered.map((b) => (
          <button key={b.id} className="card w-full text-left" onClick={() => setActive(b)}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{b.customerName}</p>
              <span className="rounded bg-zinc-800 px-2 py-1 text-xs">{b.status}</span>
            </div>
            <p className="text-sm text-zinc-400">{b.date} {b.time} • {getName(b.serviceId, "service")} • {getName(b.barberId, "barber")}</p>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <h2 className="text-lg font-bold">Booking Detail</h2>
            <p className="mt-2 text-sm">Customer: {active.customerName}</p>
            <p className="text-sm">Phone: {active.phone}</p>
            <p className="text-sm">Service: {getName(active.serviceId, "service")}</p>
            <p className="text-sm">Barber: {getName(active.barberId, "barber")}</p>
            <p className="text-sm">Status: {active.status}</p>
            <div className="mt-4 flex flex-wrap gap-2">{statuses.map((s) => <button key={s} className="btn-secondary" onClick={() => { setStatus(active.id, s); setActive({ ...active, status: s }); }}>{s}</button>)}</div>
            <button className="btn-primary mt-4 w-full" onClick={() => setActive(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
