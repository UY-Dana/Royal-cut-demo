import Link from "next/link";
import { Clock3, Scissors } from "lucide-react";
import { services } from "@/lib/mock";

export default function ServicesPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="card relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="space-y-2">
          <span className="chip">Service Menu</span>
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">Modern cuts, precision fades, and clean grooming packages tailored to your style.</p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <article key={s.id} className="card card-interactive group relative overflow-hidden p-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-200/80 via-amber-300 to-amber-200/80 opacity-70" />

            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  <Scissors size={14} className="text-amber-300" /> Premium Service
                </p>
                <h2 className="text-xl font-semibold text-zinc-100">{s.name}</h2>
              </div>
              <span className="chip whitespace-nowrap">${s.price}</span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-400">{s.description}</p>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-4">
              <p className="inline-flex items-center gap-1.5 text-sm text-zinc-300">
                <Clock3 size={15} className="text-amber-200" /> {s.durationMin} min
              </p>
              <Link href="/book" className="text-sm font-medium text-amber-200 transition hover:text-amber-100">
                Book now →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
