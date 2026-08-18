"use client";

import type { ReactNode } from "react";
import { usePanel } from "@/components/panels/useActivePanel";

/** Home is the base view — hidden whenever a panel is open, restored when it closes. */
export function HomeStage({ children }: { children: ReactNode }) {
  const { activePanel } = usePanel();
  return <div hidden={activePanel !== null}>{children}</div>;
}
