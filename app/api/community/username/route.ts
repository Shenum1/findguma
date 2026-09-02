import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isReservedUsername } from "@/lib/community/reservedUsernames";
import { containsProfanity } from "@/lib/community/profanity";

// mode is a discriminated union on purpose: a future "curated" branch (picking
// a suggested handle rather than typing one) can be added here later without
// touching this route's existing "custom" behavior or the client contract.
const schema = z.object({
  mode: z.literal("custom"),
  username: z
    .string()
    .trim()
    .min(3, "Usernames must be at least 3 characters.")
    .max(20, "Usernames must be 20 characters or fewer.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed."
    )
    .regex(/^[^_].*[^_]$|^[^_]$/, "Usernames can't start or end with an underscore."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid username." },
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

  const { username } = parsed.data;
  const usernameLower = username.toLowerCase();

  if (await isReservedUsername(usernameLower)) {
    return NextResponse.json(
      { ok: false, error: "That name is reserved." },
      { status: 422 }
    );
  }

  if (containsProfanity(username)) {
    return NextResponse.json(
      { ok: false, error: "Try a different name." },
      { status: 422 }
    );
  }

  const { data, error } = await supabase
    .from("community_profiles")
    .insert({ id: user.id, username })
    .select()
    .single();

  if (error) {
    // Postgres unique_violation on username_lower — race-safe rejection
    // instead of a pre-insert existence check.
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "That name's taken." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, profile: data });
}
