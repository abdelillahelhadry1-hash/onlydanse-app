import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardWrapper from "./DashboardWrapper";

export default async function DashboardPage() {
  const cookieStore = cookies();

  // NEW API: requires 3 arguments (supabaseUrl, supabaseKey, options)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const user = session.user;

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const roles = userRoles?.map((r) => r.role) ?? [];

  return <DashboardWrapper user={user} roles={roles} />;
}
