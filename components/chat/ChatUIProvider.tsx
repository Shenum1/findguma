"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";

interface ChatUIContextValue {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const ChatUIContext = createContext<ChatUIContextValue | null>(null);

/**
 * Owns only the drawer open/close state (sibling to CommunityAuthProvider).
 * Renders the single global drawer instance here, same "provider owns and
 * renders its own overlay" shape as NewsletterProvider/NewsletterModal — the
 * embedded, homepage copy of ChatWindow is placed explicitly in app/page.tsx.
 */
export function ChatUIProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((v) => !v), []);

  const value = useMemo<ChatUIContextValue>(
    () => ({ isDrawerOpen, openDrawer, closeDrawer, toggleDrawer }),
    [isDrawerOpen, openDrawer, closeDrawer, toggleDrawer]
  );

  return (
    <ChatUIContext.Provider value={value}>
      {children}
      <ChatWindow variant="drawer" />
    </ChatUIContext.Provider>
  );
}
