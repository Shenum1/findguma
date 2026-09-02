import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const SIGNED_URL_TTL_SECONDS = 120;

/**
 * The only place a playable URL for gated media is ever produced. Re-checks
 * auth here rather than trusting a cached client-side "I'm logged in" flag,
 * and returns 401 before Storage is touched at all — so an unauthenticated
 * request never learns the storage path, bucket name, or gets a URL, even by
 * inspecting the network tab directly.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in first." }, { status: 401 });
  }

  const { data: item } = await supabase
    .from("unreleased_content")
    .select("storage_path")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!item) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  const admin = createSupabaseAdminClient();
  const { data: signed, error } = await admin.storage
    .from("unreleased")
    .createSignedUrl(item.storage_path, SIGNED_URL_TTL_SECONDS);

  if (error || !signed) {
    return NextResponse.json({ ok: false, error: "Couldn't load that." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url: signed.signedUrl });
}
