"use client";

import type { MerchVariant } from "@/lib/types/content";
import { cn } from "@/lib/utils/cn";

export function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: {
  variants: MerchVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-pixel text-sm uppercase tracking-wider text-muted">Variant</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          const disabled = variant.stockStatus === "out_of_stock";
          return (
            <label
              key={variant.id}
              className={cn(
                "cursor-pointer border px-3 py-1.5 font-pixel text-sm uppercase tracking-wide",
                isSelected ? "border-accent text-accent" : "border-ink/40 text-ink",
                disabled && "cursor-not-allowed opacity-40"
              )}
            >
              <input
                type="radio"
                name="variant"
                value={variant.id}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onSelect(variant.id)}
                className="sr-only"
              />
              {variant.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
