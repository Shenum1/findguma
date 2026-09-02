import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server Component / Route Handler client, scoped to the requesting user's
 * session via cookies. Create a fresh one per request — cookie writes from a
 * Server Component are silently ignored (no response to attach them to); the
 * proxy (proxy.ts) is what keeps the session cookie refreshed across requests.
 *
 * See lib/supabase/types.ts — add a `<Database>` generic here once real
 * generated types exist.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component render — no-op, proxy.ts refreshes instead.
          }
        },
      },
    }
  );
}
