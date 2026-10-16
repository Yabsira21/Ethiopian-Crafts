"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { placeOrderAction } from "@/lib/actions";
import { useCartStore } from "@/lib/cartStore";
import { useCartLines } from "@/lib/useCartLines";
import CartSummary from "./CartSummary";

function Field({ label, name, error, defaultValue, type = "text", multiline = false }) {
  const id = `field-${name}`;
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label} <span className="text-red-700">(required)</span>
      </label>
      <Tag
        id={id}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? 3 : undefined}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="input"
      />
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default function CheckoutForm() {
  const router = useRouter();
  const clear = useCartStore((s) => s.clear);
  const { lines, loading, error } = useCartLines();
  const [state, formAction, pending] = useActionState(placeOrderAction, {});

  // After the server action succeeds: empty the cart, then show the confirmation page.
  useEffect(() => {
    if (state.ok) {
      clear();
      router.push(`/order-success?ref=${state.ref}`);
    }
  }, [state, clear, router]);

  if (state.ok) return <p>Placing your order...</p>;
  if (loading) return <p>Loading your cart...</p>;
  if (error) return <p role="alert" className="text-red-700">Could not load products. Please refresh the page.</p>;

  if (lines.length === 0) {
    return (
      <section className="py-12 text-center">
        <p className="text-lg">Your cart is empty, so there is nothing to order.</p>
        <Link href="/products" className="btn mt-6">Browse products</Link>
      </section>
    );
  }

  const items = JSON.stringify(lines.map((l) => ({ id: l.id, quantity: l.quantity })));

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form action={formAction} noValidate className="space-y-4 lg:col-span-2">
        <input type="hidden" name="items" value={items} />
        <Field label="Full name" name="name" error={state.errors?.name} defaultValue={state.values?.name} />
        <Field label="Phone number" name="phone" type="tel" error={state.errors?.phone} defaultValue={state.values?.phone} />
        <Field label="Delivery address" name="address" multiline error={state.errors?.address} defaultValue={state.values?.address} />
        {state.errors?.cart && <p role="alert" className="text-sm text-red-700">{state.errors.cart}</p>}
        <button className="btn" disabled={pending}>{pending ? "Placing order..." : "Place order"}</button>
      </form>
      <CartSummary lines={lines} />
    </div>
  );
}
