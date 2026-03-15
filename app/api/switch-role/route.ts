import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { role } = await req.json();
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({
            name,
            value,
            ...options,
            path: "/",
            sameSite: "lax",
            secure: true,
          });
        },
        remove(name, options) {
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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in" });
  }

  // Reset all roles
  await supabase
    .from("user_roles")
    .update({ is_primary: false })
    .eq("user_id", session.user.id);

  // Set new primary
  await supabase
    .from("user_roles")
    .update({ is_primary: true })
    .eq("user_id", session.user.id)
    .eq("role", role);

  return NextResponse.json({ success: true });
}
