// Nested layout: wraps every page under /admin. Access is enforced by middleware.
export default function AdminLayout({ children }) {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Admin dashboard</h1>
      {children}
    </section>
  );
}
