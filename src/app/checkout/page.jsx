import CheckoutForm from "@/components/CheckoutForm";

export const metadata = { title: "Checkout" };

// Protected by middleware: only logged-in users reach this page.
export default function CheckoutPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <CheckoutForm />
    </>
  );
}
