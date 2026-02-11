"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, Image, Settings, Menu, X } from "lucide-react";
import { getRole } from "@/lib/storage";
import { useEffect, useState } from "react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/catalog", label: "Catalog", icon: Image },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!getRole()) router.replace("/login");
  }, [router]);

  return (
    <div className="grid min-h-[70vh] gap-4 md:grid-cols-[248px_1fr] md:gap-6">
      <button className="btn-secondary flex w-fit items-center gap-2 md:hidden" onClick={() => setOpen((s) => !s)}>
        {open ? <X size={16} /> : <Menu size={16} />} Menu
      </button>

      {open && <button className="fixed inset-0 z-30 bg-black/50 md:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />}

      <aside className={`card fixed left-4 right-4 top-24 z-40 p-3 md:static md:block ${open ? "block" : "hidden"}`}>
        <h2 className="mb-3 text-xs font-semibold tracking-[0.28em] text-amber-200">ADMIN PANEL</h2>
        <nav className="space-y-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "border border-amber-200/25 bg-amber-300/15 text-amber-100"
                    : "border border-transparent text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:text-zinc-100"
                }`}
                onClick={() => setOpen(false)}
              >
                <Icon size={16} /> {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="space-y-4">{children}</section>
    </div>
  );
}
