import type { MetadataRoute } from "next";
import { getMerchProducts } from "@/lib/content/merch";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getMerchProducts();

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/merch`, changeFrequency: "weekly", priority: 0.8 },
    ...products.map((product) => ({
      url: `${SITE_URL}/merch/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
