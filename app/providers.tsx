"use client";

import type { ReactNode } from "react";
import { PanelProvider } from "@/components/panels/PanelProvider";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { NewsletterProvider } from "@/components/newsletter/NewsletterProvider";
import { CommunityAuthProvider } from "@/components/community/CommunityAuthProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CommunityAuthProvider>
      <PanelProvider>
        <PlayerProvider>
          <NewsletterProvider>{children}</NewsletterProvider>
        </PlayerProvider>
      </PanelProvider>
    </CommunityAuthProvider>
  );
}
