"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/useProducts";
import { updateOrderStatusAction } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

// SWR reads orders from the API; the server action changes them; mutate() refreshes the list.
export default function AdminOrders() {
  const { data: orders, error, isLoading, mutate } = useSWR("/api/orders", fetcher);

  async function handleStatusChange(ref, status) {
    await updateOrderStatusAction(ref, status);
    mutate();
  }

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p role="alert" className="text-red-700">Could not load orders.</p>;
  if (orders.length === 0) return <p className="text-stone-600">No orders yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead>
          <tr className="border-b border-stone-300">
            <th className="py-2 pr-4">Reference</th>
            <th className="py-2 pr-4">Customer</th>
            <th className="py-2 pr-4">Items</th>
            <th className="py-2 pr-4">Total</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.ref} className="border-b border-stone-200 align-top">
              <td className="py-2 pr-4 font-medium">{order.ref}</td>
              <td className="py-2 pr-4">{order.customer.name}<br />{order.customer.phone}</td>
              <td className="py-2 pr-4">{order.items.map((i) => `${i.name} x ${i.quantity}`).join(", ")}</td>
              <td className="py-2 pr-4">{formatPrice(order.total)}</td>
              <td className="py-2">
                <select
                  aria-label={`Status of order ${order.ref}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.ref, e.target.value)}
                  className="input"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
