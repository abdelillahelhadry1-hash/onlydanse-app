"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Header() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/auth"; // redirect to login
  }

  return (
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
  );
}
