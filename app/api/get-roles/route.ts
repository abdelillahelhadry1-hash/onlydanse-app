import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(_req: NextRequest) {
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
            domain: ".onlydanse.com",
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
            domain: ".onlydanse.com",
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ roles: [] });
  }

  const { data: roles } = await supabase
    .from("user_roles")
    .select("role, is_primary")
    .eq("user_id", session.user.id);

  return NextResponse.json({ roles: roles ?? [] });
}
