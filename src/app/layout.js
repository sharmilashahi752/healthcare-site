import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tejas Manyata | A Journey of Care Across Nepal",
  description: "Delivering world-class healthcare products to every family—from the bustling streets of Kathmandu to the quiet villages of the Himalayas.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-custom text-on-surface">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
