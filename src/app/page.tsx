import Link from "next/link";
import { Clock3, MapPin, Scissors, Star } from "lucide-react";

const services = [
  { name: "Classic Haircut", price: "$35", duration: "30 min" },
  { name: "Skin Fade", price: "$45", duration: "45 min" },
  { name: "Beard Trim", price: "$20", duration: "20 min" },
];

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="card relative overflow-hidden p-6 text-center sm:p-10">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-amber-200/10 blur-3xl" />

        <div className="relative space-y-5">
          <p className="text-xs tracking-[0.36em] text-amber-200/90 sm:text-sm">PREMIUM BARBERSHOP</p>
          <h1 className="text-4xl font-black tracking-[0.16em] text-zinc-50 sm:text-6xl">ROYAL CUT</h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-300 sm:text-base">Precision Fades • Clean Cuts • Sharp Lines</p>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            <Link href="/book" className="btn-primary">Book Appointment</Link>
            <Link href="https://maps.app.goo.gl/om6gfeHcqcaDM8sJ6?g_st=ic" className="btn-secondary" target="_blank">Open in Google Maps</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card card-interactive space-y-2">
          <Scissors className="text-amber-300" />
          <h3 className="text-lg font-semibold">Master Barbers</h3>
          <p className="text-sm text-zinc-400">Experienced staff for fades, classic cuts, and beard detailing.</p>
        </div>
        <div className="card card-interactive space-y-2">
          <Star className="text-amber-300" />
          <h3 className="text-lg font-semibold">Trusted Quality</h3>
          <p className="text-sm text-zinc-400">A consistent, top-rated local service that keeps clients coming back.</p>
        </div>
        <div className="card card-interactive space-y-2 sm:col-span-2 lg:col-span-1">
          <MapPin className="text-amber-300" />
          <h3 className="text-lg font-semibold">Prime Location</h3>
          <p className="text-sm text-zinc-400">Easy to reach with fast booking flow and walk-in friendly support.</p>
        </div>
      </section>

      <section className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Services</h2>
          <Link href="/services" className="text-sm text-amber-200 hover:text-amber-100">View all services</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="font-medium text-zinc-100">{s.name}</p>
              <p className="mt-1 text-sm text-zinc-400">{s.duration}</p>
              <p className="mt-3 text-amber-200">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold">Location & Hours</h3>
          <p className="mt-2 text-sm text-zinc-400">Scarborough • Monday to Saturday • 9:00 AM to 8:00 PM</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-300">
            <Clock3 size={16} className="text-amber-200" /> Walk-ins welcome when available
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Client Feedback</h3>
          <p className="mt-3 text-sm text-zinc-300">“Cleanest fade I’ve had in Scarborough. Fast booking and very consistent quality.”</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">— Returning customer</p>
        </div>
      </section>
    </div>
  );
}
