"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { WindowChrome } from "@/components/ui/WindowChrome";
import { PixelButton } from "@/components/ui/PixelButton";

type Mode = "sign-in" | "sign-up";
type Status = "idle" | "loading" | "success" | "error";

/**
 * Sign-up/sign-in run directly against Supabase Auth from the browser client
 * rather than through a custom Route Handler: onAuthStateChange (which
 * CommunityAuthProvider relies on) only fires for auth calls made by that
 * same browser client, and Supabase Auth already validates email/password
 * server-side on its own end — a Next.js wrapper route would add a layer
 * without a security or UX benefit here (unlike the username route, which
 * enforces this app's own uniqueness/reserved-name/profanity rules and
 * genuinely needs to run on the server).
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    const { data, error } =
      mode === "sign-up"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    if (mode === "sign-up" && !data.session) {
      setStatus("success");
      setMessage("Check your email to confirm your account, then sign in.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <WindowChrome
      title={mode === "sign-up" ? "PRIVATE ACCESS.SYS" : "SIGN IN.SYS"}
      raised
      className="mx-auto max-w-sm"
    >
      <p className="font-body text-sm text-muted">
        {mode === "sign-up"
          ? "Create an account to enter the unreleased archive and post in Live Chat."
          : "Welcome back."}
      </p>
      <form onSubmit={submit} noValidate className="mt-4 flex flex-col gap-3">
        <div>
          <label htmlFor="auth-email" className="sr-only">
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            className="w-full border border-ink/50 bg-canvas-raised px-3 py-2 font-pixel text-base text-ink outline-none focus-visible:border-accent"
          />
        </div>
        <div>
          <label htmlFor="auth-password" className="sr-only">
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full border border-ink/50 bg-canvas-raised px-3 py-2 font-pixel text-base text-ink outline-none focus-visible:border-accent"
          />
        </div>
        {message ? (
          <p
            role={status === "error" ? "alert" : "status"}
            className={`font-pixel text-sm ${status === "error" ? "text-red" : "text-green"}`}
          >
            {message}
          </p>
        ) : null}
        <PixelButton type="submit" disabled={status === "loading"}>
          {status === "loading" ? "…" : mode === "sign-up" ? "CREATE ACCOUNT" : "SIGN IN"}
        </PixelButton>
      </form>
      <p className="mt-4 font-pixel text-xs uppercase tracking-wider text-muted">
        {mode === "sign-up" ? (
          <>
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/sign-up" className="underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </WindowChrome>
  );
}
