import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { email } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "OnlyDanse <no-reply@onlydanse.com>",
      to: email,
      subject: "Confirm your OnlyDanse account",
      html: `
        <div style="font-family: sans-serif; padding: 24px;">
          <h2>Welcome to OnlyDanse 💃🕺</h2>
          <p>Tap the button below to confirm your account.</p>
          <a href="${data.properties.action_link}"
             style="display:inline-block; padding:12px 20px; background:#4f46e5; color:white; border-radius:8px; text-decoration:none; margin-top:16px;">
             Confirm Email
          </a>
        </div>
      `,
    }),
  });

  return NextResponse.json({ success: true });
}
