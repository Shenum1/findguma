import type { StockStatus } from "@/lib/types/content";
import { Badge } from "@/components/ui/Badge";

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
  coming_soon: "Coming soon",
};

const STOCK_TONE: Record<StockStatus, "green" | "accent" | "red" | "muted"> = {
  in_stock: "green",
  low_stock: "accent",
  out_of_stock: "red",
  coming_soon: "muted",
};

export function StockBadge({ status }: { status: StockStatus }) {
  return <Badge tone={STOCK_TONE[status]}>{STOCK_LABEL[status]}</Badge>;
}
