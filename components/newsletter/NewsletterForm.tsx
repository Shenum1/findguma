"use client";

import type { RefObject } from "react";
import { PixelButton } from "@/components/ui/PixelButton";
import { useNewsletterForm } from "@/components/newsletter/useNewsletterForm";

export function NewsletterForm({
  idPrefix,
  onSuccess,
  autoFocusRef,
}: {
  idPrefix: string;
  onSuccess?: () => void;
  autoFocusRef?: RefObject<HTMLInputElement | null>;
}) {
  const { email, setEmail, honeypot, setHoneypot, status, errorMessage, submit } =
    useNewsletterForm(onSuccess);

  if (status === "success") {
    return (
      <p role="status" className="font-pixel text-base text-green">
        SUBSCRIBED. NO SPAM — JUST UPDATES.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Email address
        </label>
        <input
          ref={autoFocusRef}
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          aria-describedby={errorMessage ? `${idPrefix}-error` : undefined}
          aria-invalid={errorMessage ? true : undefined}
          className="w-full border border-ink/50 bg-canvas-raised px-3 py-2 font-pixel text-base text-ink outline-none focus-visible:border-accent"
        />
        {/* Honeypot: hidden from sighted users, real users never fill it, bots often do */}
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        {errorMessage ? (
          <p id={`${idPrefix}-error`} role="alert" className="mt-1 font-pixel text-sm text-red">
            {errorMessage}
          </p>
        ) : null}
      </div>
      <PixelButton type="submit" disabled={status === "loading"}>
        {status === "loading" ? "SENDING…" : "SIGN ME UP"}
      </PixelButton>
    </form>
  );
}
