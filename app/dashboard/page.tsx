"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<string[]>([]);
  const [activeRole, setActiveRole] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      // Fetch roles
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (!userRoles || userRoles.length === 0) {
        router.push("/onboarding/step3-roles");
        return;
      }

      const roleList = userRoles.map((r) => r.role);
      setRoles(roleList);

      // Load active role from localStorage
      const saved = localStorage.getItem("activeRole");

      if (saved && roleList.includes(saved)) {
        setActiveRole(saved);
      } else {
        setActiveRole(roleList[0]); // default to first role
      }

      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  function switchRole(role: string) {
    setActiveRole(role);
    localStorage.setItem("activeRole", role);
  }

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* Role Switcher */}
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

      {/* Role-specific dashboards */}
      {activeRole === "dancer" && <DancerDashboard />}
      {activeRole === "instructor" && <InstructorDashboard />}
      {activeRole === "studio" && <StudioDashboard />}
      {activeRole === "organizer" && <OrganizerDashboard />}
    </div>
  );
}

/* --------------------------
   ROLE-SPECIFIC DASHBOARDS
--------------------------- */

function DancerDashboard() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Dancer Dashboard</h2>
      <p>Discover events, follow instructors, and explore your dance world.</p>
    </div>
  );
}

function InstructorDashboard() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Instructor Dashboard</h2>
      <p>Manage your classes, workshops, and students.</p>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded">
        Create a class
      </button>
    </div>
  );
}

function StudioDashboard() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Studio Dashboard</h2>
      <p>Manage your studio, instructors, and events.</p>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded">
        Create a workshop
      </button>
    </div>
  );
}

function OrganizerDashboard() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Organizer Dashboard</h2>
      <p>Manage your festivals, socials, and event promotions.</p>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded">
        Create a festival
      </button>
    </div>
  );
}
