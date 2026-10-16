import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }) {
  const { next = "/" } = await searchParams;

  return (
    <section className="mx-auto max-w-sm">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      <LoginForm next={next} />
      <div className="mt-6 rounded-lg bg-white p-4 text-sm text-stone-600">
        <p className="font-medium">Demo accounts</p>
        <p>User: user@crafts.et / user123</p>
        <p>Admin: admin@crafts.et / admin123</p>
      </div>
    </section>
  );
}
