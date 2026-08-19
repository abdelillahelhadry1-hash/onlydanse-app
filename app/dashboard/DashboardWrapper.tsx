"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";

// Import dashboards for each role
import DancerDashboard from "./dancer/DancerDashboard";
import InstructorDashboard from "./instructor/page";
import StudioDashboard from "./studio/page";
import OrganizerDashboard from "./organizer/page";

type DashboardWrapperProps = {
  user: User;
  roles: { role: string; is_primary: boolean }[];
  children?: React.ReactNode;
};

export default function DashboardWrapper({ user, roles, children }: DashboardWrapperProps) {
  const [activeRole, setActiveRole] = useState(
    roles.find((r) => r.is_primary)?.role ?? roles[0]?.role
  );

  async function handleLogout() {
    // quick client-side logout
    document.cookie = "sb:token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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

      <main>
        {activeRole === "dancer" && <DancerDashboard />}
        {activeRole === "instructor" && <InstructorDashboard />}
        {activeRole === "studio" && <StudioDashboard />}
        {activeRole === "organizer" && <OrganizerDashboard />}

        {children}
      </main>
    </div>
  );
}
