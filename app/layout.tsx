import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryNav from "@/app/components/CategoryNav";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlyDanse",
  description: "Find dance events worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Global Header */}
        <Header />

        {/* Airbnb-style Search Bar */}
        <SearchBar />

        {/* Category Navigation */}
        <CategoryNav />

        {/* Page Content */}
        <main className="pt-10 px-4">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
