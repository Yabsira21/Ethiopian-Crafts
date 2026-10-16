"use client";

import Link from "next/link";
import { useCartStore, useHydrated } from "@/lib/cartStore";

export default function CartLink() {
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const hydrated = useHydrated();

  return (
    <Link href="/cart" className="hover:underline">
      Cart ({hydrated ? count : 0})
    </Link>
  );
}
