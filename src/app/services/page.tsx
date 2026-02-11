import { services } from "@/lib/mock";

export default function ServicesPage() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <span className="chip">Service Menu</span>
        <h1 className="page-title">Services</h1>
        <p className="page-subtitle">Choose your preferred cut and grooming package.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.id} className="card card-interactive space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <span className="chip whitespace-nowrap">${s.price}</span>
            </div>
            <p className="text-sm text-zinc-400">{s.description}</p>
            <p className="text-sm text-zinc-300">Duration: {s.durationMin} min</p>
          </article>
        ))}
      </div>
    </div>
  );
}
