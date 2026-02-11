"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, Image, Settings, Menu } from "lucide-react";
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
    <div className="grid min-h-[70vh] md:grid-cols-[220px_1fr]">
      <aside className={`${open ? "block" : "hidden"} border-r border-zinc-800 bg-zinc-900 p-3 md:block`}>
        <h2 className="mb-4 text-sm font-bold tracking-widest text-amber-300">ADMIN PANEL</h2>
        <nav className="space-y-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = path === l.href;
            return (
              <Link key={l.href} href={l.href} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${active ? "bg-amber-400/20 text-amber-300" : "hover:bg-zinc-800"}`} onClick={() => setOpen(false)}>
                <Icon size={16} /> {l.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section>
        <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3 md:hidden">
          <button className="btn-secondary" onClick={() => setOpen((s) => !s)}><Menu size={16} /></button>
          <span className="text-sm text-zinc-400">Royal Cut Admin</span>
        </div>
        {children}
      </section>
    </div>
  );
}
