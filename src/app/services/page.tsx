import { services } from "@/lib/mock";

export default function ServicesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="text-zinc-400">Choose your preferred cut and grooming package.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.id} className="card">
            <div className="mb-3 flex items-start justify-between">
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <span className="rounded bg-amber-400/20 px-2 py-1 text-sm text-amber-300">${s.price}</span>
            </div>
            <p className="text-sm text-zinc-400">{s.description}</p>
            <p className="mt-2 text-sm text-zinc-300">Duration: {s.durationMin} min</p>
          </article>
        ))}
      </div>
    </div>
  );
}
