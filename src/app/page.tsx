import Link from "next/link";
import { MapPin, Scissors, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="card relative overflow-hidden p-6 text-center sm:p-10">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-amber-200/10 blur-3xl" />

        <div className="relative space-y-5">
          <p className="text-xs tracking-[0.36em] text-amber-200/90 sm:text-sm">PREMIUM BARBERSHOP</p>
          <h1 className="text-4xl font-black tracking-[0.16em] text-zinc-50 sm:text-6xl">ROYAL CUT</h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-300 sm:text-base">
            Sharp cuts. Smooth fades. A premium grooming experience designed for confidence.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            <Link href="/book" className="btn-primary">Book Appointment</Link>
            <Link href="https://maps.app.goo.gl/om6gfeHcqcaDM8sJ6?g_st=ic" className="btn-secondary" target="_blank">Google Maps</Link>
            <Link href="https://www.instagram.com/royal.cut.ca?igsh=MTRxcTVqa2lmbTR3cA==" className="btn-secondary" target="_blank">Instagram</Link>
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
        <span className="chip mb-3">About this demo</span>
        <h2 className="mb-2 text-xl font-semibold">Why Royal Cut?</h2>
        <p className="text-sm text-zinc-300 sm:text-base">
          This prototype includes a complete booking flow, style memory consent, and an admin dashboard
          for managing customers, services, and appointments.
        </p>
      </section>
    </div>
  );
}
