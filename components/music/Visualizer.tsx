import type { Visualizer as VisualizerData } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

// Real footage drops in here later as a muted, looped, poster-backed <video>;
// for now every release gets an honest placeholder rather than fabricated visuals.
export function Visualizer({ visualizer, title }: { visualizer?: VisualizerData; title: string }) {
  return (
    <div role="img" aria-label={`${title} visualizer`}>
      <PlaceholderMedia
        label={visualizer ? "VISUALIZER — PLACEHOLDER" : "COVER ART — PLACEHOLDER"}
        aspect="wide"
        variant={visualizer ? "video" : "image"}
        className="w-full"
      />
    </div>
  );
}
