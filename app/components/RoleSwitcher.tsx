"use client";

import { useState } from "react";

// Define the role type
export type UserRole = {
  role: string;
  is_primary: boolean;
};

type RoleSwitcherProps = {
  roles: UserRole[];
};

export default function RoleSwitcher({ roles }: RoleSwitcherProps) {
  const primary = roles.find((r) => r.is_primary) ?? roles[0];
  const [open, setOpen] = useState(false);

  async function switchRole(role: string) {
    await fetch("/api/switch-role", {
      method: "POST",
      body: JSON.stringify({ role }),
    });

    window.location.reload();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 rounded-md border bg-white text-sm font-medium shadow-sm hover:bg-gray-50"
      >
        As {primary.role} ▼
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
  );
}
