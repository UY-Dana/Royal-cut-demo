"use client";

import { setRole } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handle = (role: "admin" | "staff") => {
    setRole(role);
    router.push("/admin");
  };

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="space-y-2">
        <span className="chip">Internal Access</span>
        <h1 className="page-title">Staff Login</h1>
      </div>

      <div className="card space-y-3">
        <p className="text-sm text-zinc-300">Demo-only login. Pick a role:</p>
        <button className="btn-primary w-full" onClick={() => handle("admin")}>Login as Admin</button>
        <button className="btn-secondary w-full" onClick={() => handle("staff")}>Login as Staff</button>
      </div>
    </div>
  );
}
