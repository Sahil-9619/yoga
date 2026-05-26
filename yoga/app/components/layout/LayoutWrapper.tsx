"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../sections/Navbar";
import { Footer } from "../sections/Footer";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "USD",
  intent: "capture",
  components: "buttons",
};

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer for any path starting with /admin
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <PayPalScriptProvider options={initialOptions}>
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </PayPalScriptProvider>
  );
}
