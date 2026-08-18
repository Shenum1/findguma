"use client";

import { useState } from "react";
import type { MerchProduct } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { VariantSelector } from "@/components/merch/VariantSelector";
import { StockBadge } from "@/components/merch/StockBadge";
import { PixelButton } from "@/components/ui/PixelButton";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

// Display-only for this phase — cart/checkout lands in Phase 5. The data
// already carries price/stock/sku so that phase is a UI addition, not a
// data-model change.
export function MerchDetail({ product }: { product: MerchProduct }) {
  const [selectedId, setSelectedId] = useState(product.variants[0]?.id ?? "");
  const selectedVariant = product.variants.find((v) => v.id === selectedId) ?? product.variants[0];

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <PlaceholderMedia label="PRODUCT IMAGE — PLACEHOLDER" aspect="square" />
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">{product.name}</h1>
        {selectedVariant ? (
          <p className="mt-1 font-pixel text-lg text-muted">
            {formatPrice(selectedVariant.price, selectedVariant.currency)}
          </p>
        ) : null}
        <p className="mt-4 font-body text-sm leading-relaxed text-ink/90">{product.description}</p>

        {product.variants.length > 1 ? (
          <div className="mt-5">
            <VariantSelector variants={product.variants} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        ) : null}

        <div className="mt-5 flex items-center gap-3">
          {selectedVariant ? <StockBadge status={selectedVariant.stockStatus} /> : null}
        </div>

        <PixelButton className="mt-6" disabled>
          Checkout coming soon
        </PixelButton>
      </div>
    </div>
  );
}
