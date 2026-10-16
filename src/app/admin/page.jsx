import { getProducts } from "@/lib/db";
import { toggleAvailabilityAction } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import AdminOrders from "@/components/AdminOrders";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  const products = getProducts();

  return (
    <div className="space-y-10">
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="mb-3 text-xl font-semibold">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-300">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Stock</th>
                <th className="py-2"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-stone-200">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{formatPrice(p.price)}</td>
                  <td className="py-2 pr-4">{p.available ? "In stock" : "Out of stock"}</td>
                  <td className="py-2">
                    <form action={toggleAvailabilityAction.bind(null, p.id)}>
                      <button className="btn-outline">{p.available ? "Mark out of stock" : "Mark in stock"}</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="orders-heading">
        <h2 id="orders-heading" className="mb-3 text-xl font-semibold">Orders</h2>
        <AdminOrders />
      </section>
    </div>
  );
}
