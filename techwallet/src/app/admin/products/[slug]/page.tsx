import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProductsForAdmin } from "@/lib/catalog";
import ProductForm from "@/components/ProductForm";

export default function EditProduct({ params }: PageProps<"/admin/products/[slug]">) {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Edit product</h1>
      <Suspense fallback={<p className="mt-6 text-muted">Loading…</p>}>
        <EditForm params={params} />
      </Suspense>
    </>
  );
}

async function EditForm({ params }: { params: PageProps<"/admin/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = (await getAllProductsForAdmin()).find((p) => p.slug === slug);
  if (!product) notFound();
  return <ProductForm product={product} />;
}
