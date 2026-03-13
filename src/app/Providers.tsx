"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/lib/trpc-provider";
import { ToastProvider } from "@/components/ui/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <ToastProvider>{children}</ToastProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}
