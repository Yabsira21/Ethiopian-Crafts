// Signed-cookie session. Works in both middleware (Edge) and Node, so it only uses Web Crypto.
export const COOKIE_NAME = "ec_session";
const encoder = new TextEncoder();

async function sign(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(process.env.AUTH_SECRET || "dev-secret-change-me"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export async function createToken(user) {
  const payload = btoa(JSON.stringify({ email: user.email, name: user.name, role: user.role }));
  return `${payload}.${await sign(payload)}`;
}

export async function verifyToken(token) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature || (await sign(payload)) !== signature) return null;
  try {
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
