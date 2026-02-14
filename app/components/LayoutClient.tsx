"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryNav from "@/app/components/CategoryNav";
import Footer from "@/app/components/Footer";
import SearchModal from "@/app/components/SearchModal";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    async function checkProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      // Not logged in → do nothing
      if (!user) return;

      // If user is already in onboarding, don't redirect again
      if (pathname.startsWith("/onboarding")) return;

      // Check if profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // If no profile → create one and redirect
      if (!profile) {
        await supabase.from("profiles").insert({
          user_id: user.id,
          language: navigator.language || "en",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          currency: "EUR",
        });

        router.push("/onboarding/step1-city");
      }
    }

    checkProfile();
  }, [pathname, router]);

  return (
    <>
      <Header />
      <SearchModal />

      <div className={`transition-all duration-300 ${isHome ? "mt-6" : "mt-6"}`}>
        <div className={isHome ? "scale-100 opacity-100" : "scale-95 opacity-95"}>
          <SearchBar compact={!isHome} />
        </div>
      </div>

      <main className="pt-10 px-4">
        {children}
      </main>

      <CategoryNav />
      <Footer />
    </>
  );
}
