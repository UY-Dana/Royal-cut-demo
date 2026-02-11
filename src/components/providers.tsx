"use client";

import { useEffect } from "react";
import { initData } from "@/lib/storage";
import { ToastProvider } from "@/components/toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initData();
  }, []);

  return <ToastProvider>{children}</ToastProvider>;
}
