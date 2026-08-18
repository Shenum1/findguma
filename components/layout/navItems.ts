import type { PanelId } from "@/components/panels/useActivePanel";

export const PANEL_NAV_ITEMS: { id: PanelId; label: string }[] = [
  { id: "about", label: "ABOUT" },
  { id: "music", label: "MUSIC" },
  { id: "archive", label: "ARCHIVE" },
  { id: "tour", label: "TOUR" },
];
