import type { TourEvent } from "@/lib/types/content";

// No tour dates configured yet. Per the content rules, empty is the honest
// default — never fabricate events to fill this out.
const TOUR_EVENTS: TourEvent[] = [];

export async function getUpcomingTourEvents(): Promise<TourEvent[]> {
  const now = Date.now();
  return TOUR_EVENTS.filter((e) => e.published && new Date(e.date).getTime() >= now);
}

export async function getPastTourEvents(): Promise<TourEvent[]> {
  const now = Date.now();
  return TOUR_EVENTS.filter((e) => e.published && new Date(e.date).getTime() < now);
}
