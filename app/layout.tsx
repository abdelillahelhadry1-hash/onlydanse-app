import type { Metadata } from "next";
import "./globals.css";

import LayoutClient from "@/app/components/LayoutClient";

export const metadata: Metadata = {
  title: "OnlyDanse",
  description: "Find dance events worldwide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
