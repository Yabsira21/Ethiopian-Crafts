"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";

// Client Component: needs state and a click handler.
export default function AddToCartButton({ productId, available }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  if (!available) {
    return <button className="btn w-full" disabled>Out of stock</button>;
  }

  function handleClick() {
    addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button type="button" onClick={handleClick} className="btn w-full" aria-live="polite">
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
