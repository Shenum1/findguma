"use client";

import type { ReactNode } from "react";
import { PanelProvider } from "@/components/panels/PanelProvider";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { NewsletterProvider } from "@/components/newsletter/NewsletterProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PanelProvider>
      <PlayerProvider>
        <NewsletterProvider>{children}</NewsletterProvider>
      </PlayerProvider>
    </PanelProvider>
  );
}
