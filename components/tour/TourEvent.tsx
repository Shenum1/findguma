import type { TourEvent as TourEventData } from "@/lib/types/content";
import { formatDate } from "@/lib/utils/formatDate";
import { isConfigured } from "@/lib/utils/isConfigured";

export function TourEvent({ event }: { event: TourEventData }) {
  return (
    <li className="flex flex-col gap-2 border-b border-ink/15 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-pixel text-sm uppercase tracking-wide text-muted">
          {formatDate(event.date)}
          {event.time ? ` · ${event.time}` : ""}
        </p>
        <p className="font-display text-lg font-medium text-ink">
          {event.city}, {event.country}
        </p>
        <p className="font-body text-sm text-muted">{event.venue}</p>
      </div>
      <div className="flex gap-2">
        {isConfigured(event.ticketUrl) ? (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink/40 px-3 py-1.5 font-pixel text-sm uppercase tracking-wide text-ink hover:border-accent hover:text-accent"
          >
            Tickets
          </a>
        ) : null}
        {isConfigured(event.rsvpUrl) ? (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink/40 px-3 py-1.5 font-pixel text-sm uppercase tracking-wide text-ink hover:border-accent hover:text-accent"
          >
            RSVP
          </a>
        ) : null}
      </div>
    </li>
  );
}
