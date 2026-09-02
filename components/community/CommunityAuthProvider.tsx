"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { UsernameOnboardingModal } from "@/components/community/UsernameOnboardingModal";

export interface CommunityProfile {
  id: string;
  username: string;
  role: "fan" | "artist" | "moderator";
  is_banned: boolean;
}

export type CommunityStatus = "loading" | "anon" | "authed-no-username" | "authed";

interface CommunityAuthContextValue {
  status: CommunityStatus;
  user: User | null;
  profile: CommunityProfile | null;
  signOut: () => Promise<void>;
}

export const CommunityAuthContext = createContext<CommunityAuthContextValue | null>(null);

/**
 * Site-wide auth/profile context, modeled on NewsletterProvider (owns its
 * popup and renders it as a sibling). Deliberately not folded into
 * PanelProvider — that provider's PanelId union is a closed set for the
 * hash-routed "sections open in place" mechanic, while chat/auth are
 * persistent and cross-route.
 */
export function CommunityAuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<CommunityProfile | null>(null);
  const [status, setStatus] = useState<CommunityStatus>("loading");

  const loadProfile = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from("community_profiles")
        .select("id, username, role, is_banned")
        .eq("id", userId)
        .maybeSingle();
      setProfile((data as CommunityProfile | null) ?? null);
      setStatus(data ? "authed" : "authed-no-username");
    },
    [supabase]
  );

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      if (data.session?.user) {
        loadProfile(data.session.user.id);
      } else {
        setStatus("anon");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        loadProfile(nextSession.user.id);
      } else {
        setProfile(null);
        setStatus("anon");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase, loadProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  const value = useMemo<CommunityAuthContextValue>(
    () => ({ status, user: session?.user ?? null, profile, signOut }),
    [status, session, profile, signOut]
  );

  return (
    <CommunityAuthContext.Provider value={value}>
      {children}
      <UsernameOnboardingModal
        open={status === "authed-no-username"}
        onSubmitted={() => session?.user && loadProfile(session.user.id)}
      />
    </CommunityAuthContext.Provider>
  );
}
