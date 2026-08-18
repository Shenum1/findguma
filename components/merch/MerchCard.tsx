import Link from "next/link";
import type { MerchProduct } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { StockBadge } from "@/components/merch/StockBadge";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function MerchCard({ product }: { product: MerchProduct }) {
  const primaryVariant = product.variants[0];

  return (
    <Link
      href={`/merch/${product.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <PlaceholderMedia
        label="PRODUCT IMAGE — PLACEHOLDER"
        aspect="square"
        className="transition-transform group-hover:-translate-y-0.5"
      />
      <div className="mt-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg font-medium text-ink">{product.name}</p>
          {primaryVariant ? (
            <p className="font-pixel text-sm text-muted">
              {formatPrice(primaryVariant.price, primaryVariant.currency)}
            </p>
          ) : null}
        </div>
        {primaryVariant ? <StockBadge status={primaryVariant.stockStatus} /> : null}
      </div>
    </Link>
  );
}
