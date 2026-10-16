import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Order confirmed" };

export default async function OrderSuccessPage({ searchParams }) {
  const { ref } = await searchParams;
  const session = await getSession();
  const order = db.orders.find((o) => o.ref === ref);

  // Users can only see their own order; admins can see any.
  if (!order || (session?.role !== "admin" && order.userEmail !== session?.email)) notFound();

  return (
    <section className="mx-auto max-w-lg rounded-xl border border-stone-200 bg-white p-6">
      <h1 className="text-2xl font-bold text-brand">Thank you, your order is placed</h1>
      <p className="mt-2">Reference: <strong>{order.ref}</strong></p>
      <ul className="mt-4 space-y-1 text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4">
            <span>{item.name} x {item.quantity}</span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between border-t border-stone-200 pt-3 font-bold">
        <span>Total</span><span>{formatPrice(order.total)}</span>
      </p>
      <p className="mt-4 text-sm text-stone-600">
        We will deliver to {order.customer.address} and call {order.customer.phone} if needed. Pay on delivery.
      </p>
      <Link href="/products" className="btn mt-6">Continue shopping</Link>
    </section>
  );
}
