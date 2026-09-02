"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Double-content flexbox marquee (0 -> -50%, seamless loop) — but a *fixed*
 * two copies only fills the bar when one copy happens to be wider than the
 * viewport. For a short status line on a wide screen that leaves a visible
 * dead gap after the text (it never reaches the far edge, and the loop
 * looks like it's stuck around the middle). Instead we measure one copy at
 * runtime and repeat it just enough times to guarantee a full-width track
 * at any screen size/text length, then duplicate that whole track once for
 * the seamless loop.
 */
export function Marquee({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLSpanElement>(null);
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    function recalc() {
      const container = containerRef.current;
      const item = itemRef.current;
      if (!container || !item) return;
      const itemWidth = item.getBoundingClientRect().width;
      if (itemWidth === 0) return;
      const containerWidth = container.getBoundingClientRect().width;
      setRepeatCount(Math.max(1, Math.ceil(containerWidth / itemWidth)));
    }

    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    document.fonts?.ready.then(recalc);

    return () => ro.disconnect();
  }, [text]);

  const indices = Array.from({ length: repeatCount }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden border-y border-ink/20 bg-canvas-raised py-1.5"
      role="status"
      aria-label={text}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap font-pixel text-base tracking-wide text-muted motion-reduce:animate-none">
        {indices.map((i) => (
          <span
            key={`a-${i}`}
            ref={i === 0 ? itemRef : undefined}
            aria-hidden={i === 0 ? false : true}
            className="pr-12"
          >
            {text}
          </span>
        ))}
        {indices.map((i) => (
          <span key={`b-${i}`} aria-hidden="true" className="pr-12">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
