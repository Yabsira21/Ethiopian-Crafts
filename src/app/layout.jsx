import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// next/font downloads the font at build time and serves it from our own domain.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: { default: "Ethiopian Crafts", template: "%s | Ethiopian Crafts" },
  description: "Handmade Ethiopian crafts: clothing, home goods, jewelry and art.",
};

// Root layout: shared by every page (navbar, main area, footer). It does not re-render on navigation.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-500">
          Ethiopian Crafts - a Next.js class project. No payments are taken.
        </footer>
      </body>
    </html>
  );
}
