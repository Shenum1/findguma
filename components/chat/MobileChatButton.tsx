"use client";

import { useChatUI } from "@/components/chat/useChatUI";

// Occupies the header slot the hamburger used to own; main navigation moves
// to MobileMenu next to it. Glyph is a terminal prompt (">_"), not an emoji
// or icon-library glyph — reads as "live input" in the site's own retro
// system voice rather than a generic chat-bubble icon.
export function MobileChatButton() {
  const { openDrawer } = useChatUI();

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label="Open live chat"
      className="flex h-9 w-9 items-center justify-center border border-ink/70 font-pixel text-lg sm:hidden"
    >
      {">_"}
    </button>
  );
}
