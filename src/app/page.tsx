import Link from "next/link";
import { MapPin, Scissors, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="card space-y-4 p-8 text-center">
        <p className="text-sm tracking-[0.25em] text-amber-300">PREMIUM BARBERSHOP</p>
        <h1 className="text-5xl font-black tracking-wider">ROYAL CUT</h1>
        <p className="mx-auto max-w-2xl text-zinc-300">Sharp cuts. Smooth fades. Grooming fit for kings.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/book" className="btn-primary">Book Appointment</Link>
          <Link href="https://maps.app.goo.gl/om6gfeHcqcaDM8sJ6?g_st=ic" className="btn-secondary" target="_blank">Google Maps</Link>
          <Link href="https://www.instagram.com/royal.cut.ca?igsh=MTRxcTVqa2lmbTR3cA==" className="btn-secondary" target="_blank">Instagram</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card"><Scissors className="mb-2 text-amber-300" /><h3 className="font-semibold">Master Barbers</h3><p className="text-sm text-zinc-400">Experienced staff for fades, classics and beard detailing.</p></div>
        <div className="card"><Star className="mb-2 text-amber-300" /><h3 className="font-semibold">Trusted Quality</h3><p className="text-sm text-zinc-400">Top-rated local service with repeat clients.</p></div>
        <div className="card"><MapPin className="mb-2 text-amber-300" /><h3 className="font-semibold">Convenient Location</h3><p className="text-sm text-zinc-400">Downtown-ready with quick booking and walk-in support.</p></div>
      </section>

      <section className="card">
        <h2 className="mb-2 text-xl font-semibold">Why Royal Cut?</h2>
        <p className="text-zinc-300">This demo showcases booking flow, style memory consent, and an admin dashboard with customer and booking management.</p>
      </section>
    </div>
  );
}
