import { getProducts } from "@/lib/db";

// GET /api/products?category=Jewelry
export async function GET(request) {
  const category = new URL(request.url).searchParams.get("category");
  return Response.json(getProducts(category));
}
