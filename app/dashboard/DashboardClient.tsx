"use client";

import { useEffect, useState } from "react";
import DancerDashboard from "./dancer/DancerDashboard";

export default function DashboardClient({
  user,
  roles,
}: {
  user: any;
  roles: string[];
}) {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  useEffect(() => {
    if (!roles || roles.length === 0) {
      window.location.href = "/onboarding/step3-roles";
      return;
    }

    const saved = localStorage.getItem("activeRole");

    if (saved && roles.includes(saved)) {
      setActiveRole(saved);
    } else {
      setActiveRole(roles[0]);
    }
  }, [roles]);

  function switchRole(role: string) {
    setActiveRole(role);
    localStorage.setItem("activeRole", role);
  }

  if (!activeRole) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {roles.length > 1 && (
        <div className="flex gap-3">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className={`px-4 py-2 rounded border ${
                activeRole === role ? "bg-black text-white" : "bg-white"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* For now, only dancer role is implemented */}
      {activeRole === "dancer" && <DancerDashboard />}
    </div>
  );
}
