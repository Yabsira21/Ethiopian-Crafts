export const formatPrice = (n) => `${n.toLocaleString("en-US")} ETB`;

// Subtotal is always calculated from price x quantity, never hard-coded.
export const calcSubtotal = (lines) => lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
