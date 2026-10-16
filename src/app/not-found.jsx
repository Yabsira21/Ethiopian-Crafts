import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-2xl font-bold">We could not find that page</h1>
      <p className="mt-2 text-stone-600">The page or product does not exist, or it was removed.</p>
      <Link href="/products" className="btn mt-6">Back to products</Link>
    </section>
  );
}
