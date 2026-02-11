"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string };

const ToastContext = createContext<{ show: (message: string) => void }>({ show: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      show: (message: string) => {
        const id = Date.now();
        setToasts((t) => [...t, { id, message }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-amber-200/25 bg-zinc-900/95 px-3.5 py-2.5 text-sm text-zinc-100 shadow-[0_16px_45px_-26px_rgba(0,0,0,0.95)] backdrop-blur"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
