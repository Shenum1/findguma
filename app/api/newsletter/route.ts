import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    // Bots that fill the hidden field get a fake success, no work done.
    return NextResponse.json({ ok: true });
  }

  // TODO(Phase 4): persist to Supabase `newsletter_subscribers` and/or forward
  // to the email provider (Resend/Brevo/Kit) via a service-layer abstraction.
  // No provider-specific logic lives in the UI — only this route knows.
  return NextResponse.json({ ok: true });
}
