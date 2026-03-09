export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import DashboardWrapper from "./DashboardWrapper";

export default async function DashboardPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({
            name,
            value,
            ...options,
            path: "/",          // ⭐ REQUIRED
            sameSite: "lax",    // ⭐ REQUIRED
            secure: true,       // ⭐ REQUIRED on HTTPS
          });
        },
        remove(name: string, options: any) {
          cookieStore.set({
            name,
            value: "",
            ...options,
            path: "/",
            sameSite: "lax",
            secure: true,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: rolesData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const roles = Array.isArray(rolesData)
    ? rolesData.map((r) => r.role).filter(Boolean)
    : [];

  if (!roles || roles.length === 0) {
    redirect("/onboarding/step3-roles");
  }

  return <DashboardWrapper user={user} roles={roles} />;
}
