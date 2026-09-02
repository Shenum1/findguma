"use client";

import { useCallback, useState } from "react";

type Status = "idle" | "sending" | "error";

export function useChatComposer() {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const send = useCallback(async () => {
    const trimmed = body.trim();
    if (!trimmed || status === "sending") return;

    setStatus("sending");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: trimmed }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        setStatus("error");
        setErrorMessage(data?.error ?? "Message didn't send. Try again.");
        return;
      }
      setBody("");
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }, [body, status]);

  return { body, setBody, status, errorMessage, send };
}
