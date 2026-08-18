import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="pixel-corners border border-dashed border-ink/30 px-6 py-12 text-center">
      <p className="font-pixel text-lg uppercase tracking-wide text-muted">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-sm font-body text-sm text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
