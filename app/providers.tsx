"use client";

import type { ReactNode } from "react";
import { PanelProvider } from "@/components/panels/PanelProvider";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { NewsletterProvider } from "@/components/newsletter/NewsletterProvider";
import { CommunityAuthProvider } from "@/components/community/CommunityAuthProvider";
import { ChatUIProvider } from "@/components/chat/ChatUIProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CommunityAuthProvider>
      <ChatUIProvider>
        <PanelProvider>
          <PlayerProvider>
            <NewsletterProvider>{children}</NewsletterProvider>
          </PlayerProvider>
        </PanelProvider>
      </ChatUIProvider>
    </CommunityAuthProvider>
  );
}
