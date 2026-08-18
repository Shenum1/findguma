"use client";

import { useContext } from "react";
import { PanelContext } from "@/components/panels/PanelProvider";

export type { PanelId } from "@/components/panels/PanelProvider";

export function usePanel() {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanel must be used within a PanelProvider");
  }
  return context;
}
