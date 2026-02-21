import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If not logged in → redirect to auth page
  if (!session) {
    redirect("/auth");
  }

  const user = session.user;

  // Fetch roles from database
  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  return (
    <DashboardClient
      user={user}
      roles={userRoles?.map((r) => r.role) ?? []}
    />
  );
}
