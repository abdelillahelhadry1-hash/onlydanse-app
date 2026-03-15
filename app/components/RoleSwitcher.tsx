"use client";

import { useState } from "react";

export default function RoleSwitcher({ roles }) {
  const primary = roles.find(r => r.is_primary) ?? roles[0];
  const [open, setOpen] = useState(false);

  async function switchRole(role) {
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
        className="px-3 py-2 rounded-md border bg-white shadow-sm"
      >
        As {primary.role} ▼
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => switchRole(r.role)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {r.role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
