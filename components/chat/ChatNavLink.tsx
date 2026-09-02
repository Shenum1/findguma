"use client";

import { BASE_CLASS } from "@/components/layout/NavLink";
import { useChatUI } from "@/components/chat/useChatUI";

// Desktop-only entry point to the chat drawer, styled like the other header
// nav items — chat is embedded inline on the homepage, but reachable from
// any route (e.g. /merch, /sign-in) via this and MobileChatButton.
export function ChatNavLink() {
  const { openDrawer } = useChatUI();

  return (
    <button type="button" onClick={openDrawer} className={BASE_CLASS}>
      CHAT
    </button>
  );
}
