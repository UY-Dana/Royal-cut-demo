"use client";

import { useState } from "react";
import { loadSettings, saveSettings } from "@/lib/storage";
import { useToast } from "@/components/toast";

export default function AdminSettingsPage() {
  const { show } = useToast();
  const [settings, setSettings] = useState(loadSettings());

  const save = () => {
    saveSettings(settings);
    show("Settings saved");
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="card space-y-3">
        <div><label className="label">Shop Name</label><input className="input" value={settings.shopName} onChange={(e) => setSettings({ ...settings, shopName: e.target.value })} /></div>
        <div><label className="label">Address</label><input className="input" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} /></div>
        <div><label className="label">Phone</label><input className="input" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} /></div>
        <div><label className="label">Opening Hours</label><input className="input" value={settings.openingHours} onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })} /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.styleMemoryPromptEnabled} onChange={(e) => setSettings({ ...settings, styleMemoryPromptEnabled: e.target.checked })} />Enable Style Memory consent prompt</label>
        <button className="btn-primary" onClick={save}>Save Settings</button>
      </div>
    </div>
  );
}
