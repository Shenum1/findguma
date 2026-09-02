import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS entirely. NEVER import this from a
// "use client" file or return its key to the browser in any form. Use only
// for operations that must cross a trust boundary the anon key can't (e.g.
// minting signed URLs for the private "unreleased" storage bucket), after
// the caller's session has already been verified with the server client.
//
// See lib/supabase/types.ts — add a `<Database>` generic here once real
// generated types exist.
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
