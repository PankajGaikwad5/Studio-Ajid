import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageFallback from "@/components/site/PageFallback";
import ProductDetail from "@/components/site/ProductDetail";
import { findProduct, productsIn } from "@/data/products";

export function generateStaticParams() {
  return productsIn("objects").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  return { title: product ? `${product.name.en} | Studio Ajid` : "Studio Ajid" };
}

// Reading the URL happens inside Suspense, so navigation stays instant
export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<PageFallback active="objects" />}>
      <Details params={params} />
    </Suspense>
  );
}

async function Details({ params }) {
  const { slug } = await params;
  if (findProduct(slug)?.collection !== "objects") notFound();
  return <ProductDetail key={slug} slug={slug} />;
}
