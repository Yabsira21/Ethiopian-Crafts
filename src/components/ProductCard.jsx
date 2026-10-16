import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "@/lib/utils";

// No hooks or state here, so on the home page this stays a Server Component.
// Only the AddToCartButton inside it is a Client Component.
export default function ProductCard({ product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
      <Link href={`/products/${product.id}`}>
        <Image src={product.image} alt={product.name} width={400} height={300} className="h-48 w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm text-stone-500">{product.category}</p>
        <h3 className="font-semibold">
          <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="font-bold text-brand">{formatPrice(product.price)}</p>
        <div className="mt-auto pt-3">
          <AddToCartButton productId={product.id} available={product.available} />
        </div>
      </div>
    </article>
  );
}
