export function Marquee({ text }: { text: string }) {
  return (
    <div
      className="overflow-hidden border-y border-ink/20 bg-canvas-raised py-1.5"
      role="status"
      aria-label={text}
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-pixel text-base tracking-wide text-muted motion-reduce:animate-none">
        <span aria-hidden={false}>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
