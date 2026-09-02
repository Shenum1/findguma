import type { ChatConnectionState } from "@/components/chat/useChatMessages";

const LABEL: Record<ChatConnectionState, string> = {
  connecting: "CONNECTING…",
  connected: "LIVE",
  disconnected: "DISCONNECTED",
  error: "CONNECTION LOST — RETRYING",
};

const DOT_CLASS: Record<ChatConnectionState, string> = {
  connecting: "bg-muted",
  connected: "bg-green",
  disconnected: "bg-muted",
  error: "bg-red",
};

export function ChatConnectionStatus({ connection }: { connection: ChatConnectionState }) {
  if (connection === "connected") return null;

  return (
    <div
      role="status"
      className="flex items-center gap-2 border-t border-ink/70 px-3 py-1.5 font-pixel text-xs uppercase tracking-wide text-muted sm:px-4"
    >
      <span className={`h-2 w-2 rounded-full ${DOT_CLASS[connection]}`} aria-hidden="true" />
      {LABEL[connection]}
    </div>
  );
}
