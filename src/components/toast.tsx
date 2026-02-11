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
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-72 flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm shadow-lg">{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
