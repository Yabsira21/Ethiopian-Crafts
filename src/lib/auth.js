import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "./session";

// Returns { email, name, role } or null. Server-side only.
export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return token ? verifyToken(token) : null;
}
