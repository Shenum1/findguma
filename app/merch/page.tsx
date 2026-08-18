import type { Metadata } from "next";
import { getMerchProducts } from "@/lib/content/merch";
import { MerchCard } from "@/components/merch/MerchCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Merch",
  description: "Official merch.",
};

export default async function MerchPage() {
  const products = await getMerchProducts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <SectionHeading eyebrow="THE SHOP">MERCH</SectionHeading>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <MerchCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nothing here yet" description="Check back soon." />
      )}
    </div>
  );
}
