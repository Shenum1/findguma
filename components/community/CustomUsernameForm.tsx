"use client";

import type { RefObject } from "react";
import { PixelButton } from "@/components/ui/PixelButton";
import { useUsernameForm } from "@/components/community/useUsernameForm";

// The only body the onboarding modal renders in V1 (mode: "custom"). Curated
// suggestions are out of scope for now — see UsernameOnboardingModal.
export function CustomUsernameForm({
  onSuccess,
  autoFocusRef,
}: {
  onSuccess?: () => void;
  autoFocusRef?: RefObject<HTMLInputElement | null>;
}) {
  const { username, setUsername, status, errorMessage, submit } = useUsernameForm(onSuccess);

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor="username-input" className="sr-only">
          Username
        </label>
        <input
          ref={autoFocusRef}
          id="username-input"
          name="username"
          type="text"
          required
          minLength={3}
          maxLength={20}
          autoComplete="off"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="your_handle"
          aria-describedby={errorMessage ? "username-error" : undefined}
          aria-invalid={errorMessage ? true : undefined}
          className="w-full border border-ink/50 bg-canvas-raised px-3 py-2 font-pixel text-base text-ink outline-none focus-visible:border-accent"
        />
        {errorMessage ? (
          <p id="username-error" role="alert" className="mt-1 font-pixel text-sm text-red">
            {errorMessage}
          </p>
        ) : null}
      </div>
      <PixelButton type="submit" disabled={status === "loading" || username.trim().length < 3}>
        {status === "loading" ? "SAVING…" : "LOCK IT IN"}
      </PixelButton>
    </form>
  );
}
