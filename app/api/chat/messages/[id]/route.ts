import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in first." }, { status: 401 });
  }

  // RLS ("author or moderator can soft-delete") silently excludes rows this
  // caller isn't allowed to update — a returned null row means "not allowed",
  // surfaced here as a plain 403 rather than a generic failure.
  const { data, error } = await supabase
    .from("chat_messages")
    .update({ deleted_at: new Date().toISOString(), deleted_by: user.id })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, error: "You can't delete this message." },
      { status: 403 }
    );
  }

  return NextResponse.json({ ok: true });
}
