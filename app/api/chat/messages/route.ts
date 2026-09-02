import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  body: z
    .string()
    .trim()
    .min(1, "Message can't be empty.")
    .max(500, "Messages are limited to 500 characters."),
});

// No shared counter store exists yet (no Redis/Upstash in this project) — a
// per-request "was the author's last message under N seconds ago" query is
// V1-appropriate but not abuse-proof against a scripted client hammering
// parallel serverless invocations. Upgrade to a shared counter if that
// becomes a real problem.
const RATE_LIMIT_MS = 3000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid message." },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in to chat." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("community_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return NextResponse.json({ ok: false, error: "Choose a username first." }, { status: 403 });
  }

  const { data: ban } = await supabase
    .from("chat_bans")
    .select("expires_at")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (ban && (!ban.expires_at || new Date(ban.expires_at) > new Date())) {
    return NextResponse.json(
      { ok: false, error: "You can't post in chat right now." },
      { status: 403 }
    );
  }

  const { data: lastMessage } = await supabase
    .from("chat_messages")
    .select("created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastMessage && Date.now() - new Date(lastMessage.created_at).getTime() < RATE_LIMIT_MS) {
    return NextResponse.json(
      { ok: false, error: "You're sending messages too fast." },
      { status: 429 }
    );
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .insert({ author_id: user.id, body: parsed.data.body })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Message didn't send. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, message: data });
}
