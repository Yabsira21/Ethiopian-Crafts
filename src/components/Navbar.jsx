import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";
import CartLink from "./CartLink";

// Server Component: reads the session cookie and shows links for the current role.
export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-brand">Ethiopian Crafts</Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/products" className="hover:underline">Products</Link>
          {session?.role === "admin" && <Link href="/admin" className="hover:underline">Admin</Link>}
          <CartLink />
          {session ? (
            <form action={logoutAction} className="flex items-center gap-3">
              <span className="text-stone-500">Hi, {session.name}</span>
              <button className="btn-outline">Log out</button>
            </form>
          ) : (
            <Link href="/login" className="btn">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
