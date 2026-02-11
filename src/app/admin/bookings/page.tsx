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

  const getName = (id: string, type: "service" | "barber") =>
    type === "service" ? services.find((x) => x.id === id)?.name : barbers.find((x) => x.id === id)?.name;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="page-title">Bookings</h1>
        <p className="page-subtitle">Review appointments and update booking statuses.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", ...statuses].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s as BookingStatus | "all")} className={statusFilter === s ? "btn-primary" : "btn-secondary"}>
            {s}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="cursor-pointer transition hover:bg-zinc-900/70" onClick={() => setActive(b)}>
                <td>
                  <p className="font-medium text-zinc-100">{b.customerName}</p>
                  <p className="text-xs text-zinc-500">{b.phone}</p>
                </td>
                <td>{b.date} {b.time}</td>
                <td>{getName(b.serviceId, "service")}</td>
                <td><span className="chip">{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && (
        <div className="modal-backdrop">
          <div className="modal-panel max-w-lg">
            <h2 className="text-lg font-bold">Booking Detail</h2>
            <div className="mt-3 space-y-1.5 text-sm text-zinc-300">
              <p><span className="text-zinc-500">Customer:</span> {active.customerName}</p>
              <p><span className="text-zinc-500">Phone:</span> {active.phone}</p>
              <p><span className="text-zinc-500">Service:</span> {getName(active.serviceId, "service")}</p>
              <p><span className="text-zinc-500">Barber:</span> {getName(active.barberId, "barber")}</p>
              <p><span className="text-zinc-500">Status:</span> {active.status}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  className={active.status === s ? "btn-primary" : "btn-secondary"}
                  onClick={() => {
                    setStatus(active.id, s);
                    setActive({ ...active, status: s });
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <button className="btn-secondary mt-4 w-full" onClick={() => setActive(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
