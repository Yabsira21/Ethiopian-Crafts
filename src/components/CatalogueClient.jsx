"use client";

import { useState } from "react";
import { categories } from "@/data/products";
import { useProducts } from "@/lib/useProducts";
import ProductGrid from "./ProductGrid";

// Client Component: the filter and sort controls hold state, and SWR fetches /api/products.
export default function CatalogueClient() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const { data, error, isLoading } = useProducts(category);

  const products = [...(data ?? [])];
  if (sort === "low") products.sort((a, b) => a.price - b.price);
  if (sort === "high") products.sort((a, b) => b.price - a.price);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mb-1 block text-sm font-medium">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="input">
            <option value="default">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      {isLoading && <p>Loading products...</p>}
      {error && <p role="alert" className="text-red-700">Could not load products. Please refresh the page.</p>}
      {data && <ProductGrid products={products} />}
    </>
  );
}
