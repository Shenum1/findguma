import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUnreleasedItemsForViewer } from "@/lib/content/unreleased";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in first." }, { status: 401 });
  }

  const items = await getUnreleasedItemsForViewer();
  return NextResponse.json({ ok: true, items });
}
