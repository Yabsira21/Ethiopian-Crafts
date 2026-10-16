import { products as seed } from "@/data/products";

// In-memory "database" for class use. Data resets when the server restarts.
// globalThis keeps it alive across hot reloads in development.
globalThis.__craftsDb ??= { products: seed.map((p) => ({ ...p })), orders: [] };
export const db = globalThis.__craftsDb;

export function getProducts(category) {
  return category && category !== "All" ? db.products.filter((p) => p.category === category) : db.products;
}
export const getProduct = (id) => db.products.find((p) => p.id === String(id));
