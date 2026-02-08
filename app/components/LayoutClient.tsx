"use client";

import { usePathname } from "next/navigation";

import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryNav from "@/app/components/CategoryNav";
import Footer from "@/app/components/Footer";
import SearchModal from "@/app/components/SearchModal";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Header />
      <SearchModal />

      {/* SearchBar stays at the top, clean and uncluttered */}
      <div className={`transition-all duration-300 ${isHome ? "mt-6" : "mt-6"}`}>
        <div className={isHome ? "scale-100 opacity-100" : "scale-95 opacity-95"}>
          <SearchBar compact={!isHome} />
        </div>
      </div>

      {/* Main content */}
      <main className="pt-10 px-4">
        {children}
      </main>

      {/* CategoryNav moved BELOW content */}
      <CategoryNav />

      <Footer />
    </>
  );
}
