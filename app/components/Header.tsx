"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Define a proper type for roles
type UserRole = {
  role: string;
  is_primary: boolean;
};

export default function Header() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [primaryRole, setPrimaryRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Fetch roles from API
  useEffect(() => {
    async function loadRoles() {
      const res = await fetch("/api/get-roles", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.roles && data.roles.length > 0) {
        setRoles(data.roles);
        setLoggedIn(true);

        const primary =
          data.roles.find((r: UserRole) => r.is_primary) ?? data.roles[0];

        setPrimaryRole(primary.role);
      }
    }

    loadRoles();
  }, []);

  async function switchRole(role: string) {
    await fetch("/api/switch-role", {
      method: "POST",
      body: JSON.stringify({ role }),
      credentials: "include",
    });

    window.location.reload();
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-8">
          /
            OnlyDanse
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            /shop
              Shop
            </Link>

            /blog
              Blog
            </Link>

            /contact
              Contact
            </Link>

            /about
              About
            </Link>

            {/* Dashboard visible only when logged in */}
            {loggedIn && (
              /dashboard
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
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                  {roles.map((r: UserRole) => (
                    <button
                      key={r.role}
                      onClick={() => switchRole(r.role)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {r.role === primaryRole ? "✓ " : ""}
                      {r.role.charAt(0).toUpperCase() + r.role.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth buttons (only when logged out) */}
          {!loggedIn && (
            <>
              /auth
                Login
              </Link>

              /auth
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
