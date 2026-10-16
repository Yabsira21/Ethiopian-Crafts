"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { users } from "@/data/users";
import { db, getProduct } from "./db";
import { getSession } from "./auth";
import { createToken, COOKIE_NAME } from "./session";

const text = (formData, key) => String(formData.get(key) ?? "").trim();

async function requireAdmin() {
  const session = await getSession();
  if (session?.role !== "admin") throw new Error("Forbidden");
}

export async function loginAction(prevState, formData) {
  const email = text(formData, "email").toLowerCase();
  const password = text(formData, "password");
  const next = text(formData, "next");

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { error: "Wrong email or password.", email };

  const store = await cookies();
  store.set(COOKIE_NAME, await createToken(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  revalidatePath("/", "layout");

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  redirect(user.role === "admin" && safeNext === "/" ? "/admin" : safeNext);
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function placeOrderAction(prevState, formData) {
  const session = await getSession();
  if (!session) redirect("/login?next=/checkout");

  const values = {
    name: text(formData, "name"),
    phone: text(formData, "phone"),
    address: text(formData, "address"),
  };
  const errors = {};
  if (values.name.length < 2) errors.name = "Enter your full name.";
  if (!/^\+?\d{9,13}$/.test(values.phone.replace(/\s/g, ""))) errors.phone = "Enter a valid phone number, for example 0911223344.";
  if (values.address.length < 5) errors.address = "Enter your delivery address.";

  // Only product ids and quantities come from the browser. Names and prices are read on the server.
  let cart = [];
  try {
    cart = JSON.parse(text(formData, "items"));
  } catch {}
  const items = [];
  for (const entry of Array.isArray(cart) ? cart : []) {
    const product = getProduct(entry?.id);
    const quantity = Number(entry?.quantity);
    if (product?.available && Number.isInteger(quantity) && quantity > 0) {
      items.push({ id: product.id, name: product.name, price: product.price, quantity });
    }
  }
  if (items.length === 0) errors.cart = "Your cart is empty or its items are no longer available.";

  if (Object.keys(errors).length > 0) return { errors, values };

  const order = {
    ref: "EC-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    userEmail: session.email,
    customer: values,
    items,
    total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  db.orders.unshift(order);
  revalidatePath("/admin");
  return { ok: true, ref: order.ref };
}

export async function updateOrderStatusAction(ref, status) {
  await requireAdmin();
  if (!["pending", "shipped", "delivered"].includes(status)) return;
  const order = db.orders.find((o) => o.ref === ref);
  if (order) order.status = status;
}

export async function toggleAvailabilityAction(id) {
  await requireAdmin();
  const product = getProduct(id);
  if (product) product.available = !product.available;
  revalidatePath("/", "layout");
}
