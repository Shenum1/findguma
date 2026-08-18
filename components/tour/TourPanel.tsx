import type { TourEvent as TourEventData } from "@/lib/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { TourEvent } from "@/components/tour/TourEvent";

export function TourPanel({
  upcoming,
  past,
}: {
  upcoming: TourEventData[];
  past: TourEventData[];
}) {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading eyebrow="ON THE ROAD">TOUR</SectionHeading>
        {upcoming.length > 0 ? (
          <ul>
            {upcoming.map((event) => (
              <TourEvent key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No shows scheduled"
            description="Check back soon — new dates get posted here first."
          />
        )}
      </div>
      {past.length > 0 ? (
        <div>
          <SectionHeading eyebrow="ARCHIVE">PAST SHOWS</SectionHeading>
          <ul>
            {past.map((event) => (
              <TourEvent key={event.id} event={event} />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
