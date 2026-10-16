import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET /api/orders - admin sees all orders, a normal user sees only their own.
export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const orders = session.role === "admin" ? db.orders : db.orders.filter((o) => o.userEmail === session.email);
  return Response.json(orders);
}
