"use client";

import { useCartStore, useHydrated } from "./cartStore";
import { useProducts } from "./useProducts";

// Joins cart items (id + quantity) with product data (name, price, ...).
export function useCartLines() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const { data: products, error } = useProducts();

  const lines = products
    ? items.flatMap((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? [{ ...product, quantity: item.quantity }] : [];
      })
    : [];

  return { lines, error, loading: !hydrated || (!products && !error) };
}
