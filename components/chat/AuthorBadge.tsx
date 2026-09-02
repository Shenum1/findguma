import { Badge } from "@/components/ui/Badge";
import type { ChatAuthor } from "@/components/chat/useChatMessages";

// Deliberately not a generic verification checkmark — a pixel star + text
// label, in the site's own retro-system voice, per the "this belongs to the
// artist's world, not a SaaS chat widget" brief.
export function AuthorBadge({ role }: { role: ChatAuthor["role"] }) {
  if (role === "artist") {
    return (
      <Badge tone="accent">
        <span aria-hidden="true">★</span> OFFICIAL
      </Badge>
    );
  }
  if (role === "moderator") {
    return <Badge tone="blue">MOD</Badge>;
  }
  return null;
}
