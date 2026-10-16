"use client";

import useSWR from "swr";

export const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  });

// Fetches products from the /api/products route handler. SWR caches by URL.
export function useProducts(category = "All") {
  const query = category === "All" ? "" : `?category=${encodeURIComponent(category)}`;
  return useSWR(`/api/products${query}`, fetcher);
}
