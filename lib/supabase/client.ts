"use client";

import { createBrowserClient } from "@supabase/ssr";

// See lib/supabase/types.ts — add a `<Database>` generic here once real
// generated types exist.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
