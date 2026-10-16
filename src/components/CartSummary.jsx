import { formatPrice, calcSubtotal } from "@/lib/utils";

export default function CartSummary({ lines, children }) {
  return (
    <aside aria-label="Order summary" className="h-fit rounded-xl border border-stone-200 bg-white p-4">
      <h2 className="mb-3 font-semibold">Order summary</h2>
      <ul className="space-y-1 text-sm">
        {lines.map((line) => (
          <li key={line.id} className="flex justify-between gap-4">
            <span>{line.name} x {line.quantity}</span>
            <span>{formatPrice(line.price * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between border-t border-stone-200 pt-3 font-bold">
        <span>Subtotal</span>
        <span>{formatPrice(calcSubtotal(lines))}</span>
      </p>
      {children && <div className="mt-4">{children}</div>}
    </aside>
  );
}
