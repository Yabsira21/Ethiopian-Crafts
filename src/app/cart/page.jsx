"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { useCartLines } from "@/lib/useCartLines";
import { formatPrice } from "@/lib/utils";
import CartSummary from "@/components/CartSummary";

export default function CartPage() {
  const { lines, loading, error } = useCartLines();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p role="alert" className="text-red-700">Could not load products. Please refresh the page.</p>;

  if (lines.length === 0) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-stone-600">Add something you like and it will show up here.</p>
        <Link href="/products" className="btn mt-6">Browse products</Link>
      </section>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Shopping cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {lines.map((line) => (
            <li key={line.id} className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">{line.name}</h2>
                <p className="text-sm text-stone-500">{formatPrice(line.price)} each</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn-outline" aria-label={`Decrease quantity of ${line.name}`} onClick={() => setQuantity(line.id, line.quantity - 1)}>-</button>
                <span className="w-6 text-center" aria-live="polite">{line.quantity}</span>
                <button className="btn-outline" aria-label={`Increase quantity of ${line.name}`} onClick={() => setQuantity(line.id, line.quantity + 1)}>+</button>
                <span className="w-28 text-right font-semibold">{formatPrice(line.price * line.quantity)}</span>
                <button className="text-sm text-red-700 underline" onClick={() => removeItem(line.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <CartSummary lines={lines}>
          <Link href="/checkout" className="btn w-full">Go to checkout</Link>
        </CartSummary>
      </div>
    </>
  );
}
