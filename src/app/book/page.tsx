"use client";

import { useMemo, useState } from "react";
import { addBooking, loadBarbers, loadServices, loadSettings } from "@/lib/storage";
import { useToast } from "@/components/toast";

const slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

export default function BookPage() {
  const { show } = useToast();
  const services = useMemo(() => loadServices(), []);
  const barbers = useMemo(() => loadBarbers(), []);
  const settings = useMemo(() => loadSettings(), []);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ serviceId: "", barberId: "", date: "", time: "", name: "", phone: "", notes: "", consent: false });

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const valid =
    (step === 1 && form.serviceId) ||
    (step === 2 && form.barberId) ||
    (step === 3 && form.date && form.time) ||
    (step === 4 && form.name && form.phone) ||
    step === 5;

  const submit = () => {
    if (!form.name || !form.phone) return show("Please add your details.");
    addBooking({
      customerId: `cust-${Date.now()}`,
      customerName: form.name,
      phone: form.phone,
      serviceId: form.serviceId,
      barberId: form.barberId,
      date: form.date,
      time: form.time,
      notes: form.notes,
      styleMemoryConsent: form.consent,
    });
    setDone(true);
    show("Booking saved successfully.");
  };

  if (done) return <div className="card mx-auto max-w-lg text-center"><h1 className="mb-2 text-2xl font-bold">Booking Confirmed</h1><p className="text-zinc-300">Thanks! Your appointment request has been saved locally for this demo.</p></div>;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-3xl font-bold">Book Appointment</h1>
      <p className="text-sm text-zinc-400">Step {step}/5</p>
      <div className="card space-y-4">
        {step === 1 && <select className="input" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}><option value="">Select service</option>{services.map((s) => <option value={s.id} key={s.id}>{s.name} - ${s.price}</option>)}</select>}
        {step === 2 && <select className="input" value={form.barberId} onChange={(e) => setForm({ ...form, barberId: e.target.value })}><option value="">Select barber</option>{barbers.map((b) => <option value={b.id} key={b.id}>{b.name} ({b.specialty})</option>)}</select>}
        {step === 3 && <div className="space-y-3"><input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><div className="grid grid-cols-3 gap-2">{slots.map((slot) => <button key={slot} onClick={() => setForm({ ...form, time: slot })} className={form.time === slot ? "btn-primary" : "btn-secondary"}>{slot}</button>)}</div></div>}
        {step === 4 && <div className="space-y-3"><input className="input" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="input" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><textarea className="input" placeholder="Optional notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>}
        {step === 5 && (
          <div className="space-y-3 text-sm">
            <p className="text-zinc-300">Review your appointment and confirm.</p>
            {settings.styleMemoryPromptEnabled && <label className="flex items-start gap-2"><input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" /><span>I consent to Royal Cut storing my style preferences for future visits.<span className="block text-xs text-zinc-500">Style Memory helps our team remember your preferred cut details between appointments.</span></span></label>}
          </div>
        )}
        <div className="flex justify-between">
          <button className="btn-secondary" onClick={prev} disabled={step === 1}>Back</button>
          {step < 5 ? <button className="btn-primary disabled:opacity-50" disabled={!valid} onClick={next}>Next</button> : <button className="btn-primary" onClick={submit}>Confirm Booking</button>}
        </div>
      </div>
    </div>
  );
}
