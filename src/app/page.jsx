import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/db";

export default function HomePage() {
  const featured = getProducts().slice(0, 4);

  return (
    <>
      <section className="grid items-center gap-6 md:grid-cols-2">
        <Image src="/images/hero.png" alt="Green, yellow and red stripes" width={1200} height={500} priority className="h-auto w-full rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Handmade crafts from Ethiopia</h1>
          <p className="mt-3 max-w-prose text-stone-600">
            Clothing, coffee ceremony pieces, jewelry and art, made by Ethiopian artisans.
          </p>
          <Link href="/products" className="btn mt-6">Browse products</Link>
        </div>
        {/* priority: this is the largest image on the page (LCP), so it should load first */}
      </section>

      <section className="mt-12" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="mb-4 text-xl font-semibold">Featured products</h2>
        <ProductGrid products={featured} />
      </section>
    </>
  );
}
