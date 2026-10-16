import CatalogueClient from "@/components/CatalogueClient";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Products</h1>
      <CatalogueClient />
    </>
  );
}
