"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// The cart stores only { id, quantity }. Names and prices always come from the product data.
export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (id) =>
        set((state) => {
          const found = state.items.find((i) => i.id === id);
          return {
            items: found
              ? state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
              : [...state.items, { id, quantity: 1 }],
          };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "ethiopian-crafts-cart" } // saved in localStorage
  )
);

// localStorage is not available on the server, so show cart data only after the first client render.
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
