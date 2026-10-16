import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getProduct } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? product.name : "Product not found" };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params; // in Next.js 15, params is a Promise
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <Link href="/products" className="text-sm underline">Back to products</Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <Image src={product.image} alt={product.name} width={600} height={450} priority className="h-auto w-full rounded-xl" />
        <div>
          <p className="text-sm text-stone-500">{product.category}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-xl font-bold text-brand">{formatPrice(product.price)}</p>
          <p className="mt-4 text-stone-700">{product.description}</p>
          <p className="mt-4 font-medium">{product.available ? "In stock" : "Out of stock"}</p>
          <div className="mt-6 max-w-xs">
            <AddToCartButton productId={product.id} available={product.available} />
          </div>
        </div>
      </div>
    </>
  );
}
