"use client";

import { useEffect, useState } from "react";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return document.cookie
              .split("; ")
              .find((row) => row.startsWith(name + "="))
              ?.split("=")[1];
          },
          set(name, value) {
            document.cookie = `${name}=${value}; path=/; SameSite=Lax; Secure`;
          },
          remove(name) {
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          },
        },
      }
    );

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  async function handleLogout() {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return document.cookie
              .split("; ")
              .find((row) => row.startsWith(name + "="))
              ?.split("=")[1];
          },
          set(name, value) {
            document.cookie = `${name}=${value}; path=/; SameSite=Lax; Secure`;
          },
          remove(name) {
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          },
        },
      }
    );

    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Dashboard</h1>
        {user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md border bg-white text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <a href="/auth/signin" className="text-sm">Sign in</a>
            <a href="/auth/signup" className="text-sm">Sign up</a>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
}
