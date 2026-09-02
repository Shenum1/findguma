import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  messageId: z.string().uuid("Invalid message."),
  reason: z.string().trim().min(1, "Add a reason.").max(300, "Keep it under 300 characters."),
});

// No review UI ships in V1 — the artist triages open reports directly via
// the Supabase Studio table editor.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid report." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in first." }, { status: 401 });
  }

  const { error } = await supabase.from("chat_reports").insert({
    message_id: parsed.data.messageId,
    reporter_id: user.id,
    reason: parsed.data.reason,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Couldn't file the report. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
