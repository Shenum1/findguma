import type { MerchProduct } from "@/lib/types/content";

// PLACEHOLDER CONTENT — prices/stock are illustrative only, not real figures.
const PRODUCTS: MerchProduct[] = [
  {
    slug: "logo-tee",
    name: "LOGO TEE",
    description: "[Product description goes here.]",
    published: true,
    variants: [
      { id: "logo-tee-s", label: "S", price: 15000, currency: "NGN", stockStatus: "in_stock", sku: "TEE-S" },
      { id: "logo-tee-m", label: "M", price: 15000, currency: "NGN", stockStatus: "in_stock", sku: "TEE-M" },
      { id: "logo-tee-l", label: "L", price: 15000, currency: "NGN", stockStatus: "low_stock", sku: "TEE-L" },
      { id: "logo-tee-xl", label: "XL", price: 15000, currency: "NGN", stockStatus: "out_of_stock", sku: "TEE-XL" },
    ],
  },
  {
    slug: "archive-cap",
    name: "ARCHIVE CAP",
    description: "[Product description goes here.]",
    published: true,
    variants: [
      { id: "archive-cap-os", label: "One Size", price: 9500, currency: "NGN", stockStatus: "in_stock", sku: "CAP-OS" },
    ],
  },
  {
    slug: "vinyl-release-two",
    name: "RELEASE TITLE TWO — VINYL",
    description: "[Product description goes here.]",
    published: true,
    variants: [
      { id: "vinyl-release-two-std", label: "Standard", price: 25000, currency: "NGN", stockStatus: "coming_soon", sku: "VNL-R2" },
    ],
  },
];

export async function getMerchProducts(): Promise<MerchProduct[]> {
  return PRODUCTS.filter((p) => p.published);
}

export async function getMerchProductBySlug(slug: string): Promise<MerchProduct | undefined> {
  return PRODUCTS.find((p) => p.slug === slug && p.published);
}
