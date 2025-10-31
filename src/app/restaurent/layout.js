// app/layout.js
import Header from "@/components/restaurents/Header";
import "../../app/globals.css";

export const metadata = {
  title: "Restaurent Section",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}
