import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface UnreleasedItemSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  kind: "audio" | "video";
  duration_seconds: number | null;
}

/**
 * The one lib/content/*.ts accessor backed by a live query rather than a
 * static placeholder array: unreleased_content only ever holds real,
 * admin-entered rows (via Supabase Studio — no fabricated placeholder
 * "unreleased track" content belongs here). Relies on the caller having
 * already confirmed the request is authenticated — RLS ("authenticated
 * users read unreleased metadata") independently enforces the same rule.
 */
export async function getUnreleasedItemsForViewer(): Promise<UnreleasedItemSummary[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("unreleased_content")
    .select("id, slug, title, description, kind, duration_seconds")
    .order("sort_order", { ascending: true });

  return (data ?? []) as UnreleasedItemSummary[];
}
