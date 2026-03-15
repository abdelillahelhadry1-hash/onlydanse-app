"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [roles, setRoles] = useState([]);
  const [primaryRole, setPrimaryRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Fetch roles from API
  useEffect(() => {
    async function loadRoles() {
      const res = await fetch("/api/get-roles");
      const data = await res.json();

      if (data.roles && data.roles.length > 0) {
        setRoles(data.roles);
        setLoggedIn(true);

        const primary = data.roles.find((r) => r.is_primary) ?? data.roles[0];
        setPrimaryRole(primary.role);
      }
    }

    loadRoles();
  }, []);

  async function switchRole(role) {
    await fetch("/api/switch-role", {
      method: "POST",
      body: JSON.stringify({ role }),
    });

    window.location.reload();
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            OnlyDanse
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link href="/shop" className="hover:text-black transition-colors">
              Shop
            </Link>
            <Link href="/blog" className="hover:text-black transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-black transition-colors">
              Contact
            </Link>
            <Link href="/about" className="hover:text-black transition-colors">
              About
            </Link>

            {/* Dashboard visible only when logged in */}
            {loggedIn && (
              <Link
                href="/dashboard"
                className="hover:text-black transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        {/* Right side: Search + Role Switcher + Auth */}
        <div className="flex items-center gap-4">
          {/* Search button */}
          <button
            onClick={() => document.dispatchEvent(new Event("openSearchModal"))}
            className="hidden md:inline-flex px-4 py-2 rounded-full border text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Search
          </button>

          {/* Role Switcher (only when logged in) */}
          {loggedIn && primaryRole && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-3 py-2 rounded-md border bg-white text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                As {primaryRole} ▼
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => switchRole(r.role)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {r.role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth buttons (only when logged out) */}
          {!loggedIn && (
            <>
              <Link
                href="/auth"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Login
              </Link>

              <Link
                href="/auth"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
