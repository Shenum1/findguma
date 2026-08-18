"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { readLocalStorage, writeLocalStorage } from "@/hooks/useLocalStorage";
import { readSessionStorage, writeSessionStorage } from "@/hooks/useSessionStorage";
import { NewsletterModal } from "@/components/newsletter/NewsletterModal";

// Lowered via NEXT_PUBLIC_NEWSLETTER_DELAY_MS during manual QA; 15s in production
// per the brief's required popup timing.
const NEWSLETTER_DELAY_MS = Number(process.env.NEXT_PUBLIC_NEWSLETTER_DELAY_MS) || 15000;
const DISMISS_COOLDOWN_DAYS = 7;

const STORAGE_SUBSCRIBED = "newsletter:subscribed";
const STORAGE_DISMISSED_AT = "newsletter:dismissedAt";
const SESSION_DISMISSED = "newsletter:dismissedThisSession";

interface NewsletterContextValue {
  isOpen: boolean;
  subscribed: boolean;
  dismiss: () => void;
  markSubscribed: () => void;
}

export const NewsletterContext = createContext<NewsletterContextValue | null>(null);

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // Lazy initializer (not an effect): reads localStorage once, synchronously,
  // before first paint on the client. Guarded for SSR where window is absent.
  const [subscribed, setSubscribed] = useState(() => {
    if (typeof window === "undefined") return false;
    return readLocalStorage(STORAGE_SUBSCRIBED) === "1";
  });

  useEffect(() => {
    if (subscribed) return;
    if (readSessionStorage(SESSION_DISMISSED) === "1") return;

    const dismissedAt = readLocalStorage(STORAGE_DISMISSED_AT);
    if (dismissedAt) {
      const elapsedDays = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (elapsedDays < DISMISS_COOLDOWN_DAYS) return;
    }

    const timer = setTimeout(() => setIsOpen(true), NEWSLETTER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [subscribed]);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    writeSessionStorage(SESSION_DISMISSED, "1");
    writeLocalStorage(STORAGE_DISMISSED_AT, String(Date.now()));
  }, []);

  const markSubscribed = useCallback(() => {
    setIsOpen(false);
    setSubscribed(true);
    writeLocalStorage(STORAGE_SUBSCRIBED, "1");
  }, []);

  const value = useMemo<NewsletterContextValue>(
    () => ({ isOpen, subscribed, dismiss, markSubscribed }),
    [isOpen, subscribed, dismiss, markSubscribed]
  );

  return (
    <NewsletterContext.Provider value={value}>
      {children}
      <NewsletterModal />
    </NewsletterContext.Provider>
  );
}
