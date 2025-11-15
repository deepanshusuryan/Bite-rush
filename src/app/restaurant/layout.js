"use client";

import Header from "@/components/restaurents/Header";
import "../../app/globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideHeaderFooter =
    pathname === "/restaurant/login" ||
    pathname === "/restaurant/register" ||
    pathname === "/restaurant/dashboard";

  return (
    <html lang="en">
      <body>
          {!hideHeaderFooter && <Header />}
          <main>{children}</main>
      </body>
    </html>
  );
}
