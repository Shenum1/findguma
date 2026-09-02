import type { Freestyle } from "@/lib/types/content";

// PLACEHOLDER CONTENT — real freestyles replace these entries later.
const FREESTYLES: Freestyle[] = [
  {
    id: "freestyle-1",
    title: "[Freestyle title]",
    date: "2026-01",
    description: "[Short note about this freestyle goes here.]",
  },
  {
    id: "freestyle-2",
    title: "[Freestyle title]",
    date: "2025-12",
  },
];

export async function getFreestyles(): Promise<Freestyle[]> {
  return FREESTYLES;
}
