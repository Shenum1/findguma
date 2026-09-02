"use client";

import { useCallback, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useUsernameForm(onSuccess?: () => void) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setStatus("loading");
      setErrorMessage(null);
      try {
        const response = await fetch("/api/community/username", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "custom", username }),
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
    [username, onSuccess]
  );

  return { username, setUsername, status, errorMessage, submit };
}
