"use client";

import { useCallback, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useNewsletterForm(onSuccess?: () => void) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (honeypot) return; // silently drop bot submissions
      setStatus("loading");
      setErrorMessage(null);
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, honeypot }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok || !data?.ok) {
          setStatus("error");
          setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
          return;
        }
        setStatus("success");
        onSuccess?.();
      } catch {
        setStatus("error");
        setErrorMessage("Network error. Please try again.");
      }
    },
    [email, honeypot, onSuccess]
  );

  return { email, setEmail, honeypot, setHoneypot, status, errorMessage, submit };
}
