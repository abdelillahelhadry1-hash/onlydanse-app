import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
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
            path: "/",          
            sameSite: "lax",    
            secure: true,       
            domain: ".onlydanse.com",   // ⭐ REQUIRED
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
            domain: ".onlydanse.com",   // ⭐ REQUIRED
          });
        },
      },
    }
  );

  await supabase.auth.exchangeCodeForSession(request.url);

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
