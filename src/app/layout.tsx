import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenCart Shoe shop",
  description:
    "Get the latest and freshest shoes. Trendy shoes in Kenya in stock. Grab your now becaues the stock is out.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
