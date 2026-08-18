import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMerchProductBySlug, getMerchProducts } from "@/lib/content/merch";
import { MerchDetail } from "@/components/merch/MerchDetail";

export async function generateStaticParams() {
  const products = await getMerchProducts();
  return products.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getMerchProductBySlug(productSlug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function MerchProductPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getMerchProductBySlug(productSlug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <MerchDetail product={product} />
    </div>
  );
}
